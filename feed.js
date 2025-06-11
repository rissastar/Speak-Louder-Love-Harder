// Initialize Supabase client
const supabaseUrl = 'https://zgjfbbfnldxlvzstnfzy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnamZiYmZubGR4bHZ6c3RuZnp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NDczNzIsImV4cCI6MjA2NTIyMzM3Mn0.-Lt8UIAqI5ySoyyTGzRs3JVBhdcZc8zKxiLH6qbu3dU';
const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

// DOM elements
const postForm = document.getElementById('postForm');
const postContent = document.getElementById('postContent');
const postImageInput = document.getElementById('postImage');
const imagePreview = document.getElementById('imagePreview');
const postsList = document.getElementById('postsList');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const topicToggleBtn = document.getElementById('topicToggleBtn');
const topicDropdown = document.getElementById('topicDropdown');
const logoutBtn = document.getElementById('logoutBtn');
const settingsBtn = document.getElementById('settingsBtn');

let lastCreatedAt = null;
const POSTS_PER_PAGE = 5;
let currentUser = null;

// Helpers

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text?.replace(/[&<>"']/g, m => map[m]) || '';
}

// Toggle topic dropdown
topicToggleBtn.addEventListener('click', () => {
  const expanded = topicToggleBtn.getAttribute('aria-expanded') === 'true';
  topicToggleBtn.setAttribute('aria-expanded', !expanded);
  topicDropdown.classList.toggle('hidden');
});

// Settings and logout
settingsBtn.addEventListener('click', () => {
  window.location.href = 'settings.html';
});

logoutBtn.addEventListener('click', async () => {
  await supabase.auth.signOut();
  window.location.href = 'logout.html';
});

// Image preview
postImageInput.addEventListener('change', () => {
  const file = postImageInput.files[0];
  if (!file) {
    imagePreview.classList.add('hidden');
    return;
  }
  const reader = new FileReader();
  reader.onload = e => {
    imagePreview.src = e.target.result;
    imagePreview.classList.remove('hidden');
  };
  reader.readAsDataURL(file);
});

// Post submit handler
postForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!currentUser) return alert('You must be logged in.');

  const content = postContent.value.trim();
  if (!content && !postImageInput.files.length) {
    return alert('Post must have text or an image.');
  }

  let image_url = null;
  const file = postImageInput.files[0];
  if (file) {
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage.from('avatars').upload(fileName, file);
    if (error) return alert('Image upload failed.');
    image_url = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;
  }

  const { error: insertError } = await supabase.from('posts').insert({
    content,
    image_url,
    user_id: currentUser.id,
  });

  if (insertError) {
    alert('Failed to create post.');
  } else {
    postForm.reset();
    imagePreview.classList.add('hidden');
    await loadInitialPosts();
  }
});

// Likes handling (toggle like/unlike)
async function toggleLike(postId, liked) {
  if (!currentUser) return alert('Login to like posts.');

  if (liked) {
    // Remove like
    await supabase
      .from('likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', currentUser.id);
  } else {
    // Add like
    await supabase.from('likes').insert({
      post_id: postId,
      user_id: currentUser.id,
    });
  }
  await loadInitialPosts();
}

// Add comment submit handler
async function addComment(postId, commentInput) {
  const content = commentInput.value.trim();
  if (!content) return;
  if (!currentUser) return alert('Login to comment.');

  const { error } = await supabase.from('comments').insert({
    post_id: postId,
    user_id: currentUser.id,
    content,
  });
  if (error) {
    alert('Failed to add comment.');
  } else {
    commentInput.value = '';
    await loadInitialPosts();
  }
}

// Load initial posts
async function loadInitialPosts() {
  postsList.innerHTML = '';
  lastCreatedAt = null;
  const posts = await fetchPosts();
  renderPosts(posts);
  loadMoreBtn.style.display = posts.length < POSTS_PER_PAGE ? 'none' : 'block';
}

// Load more posts
loadMoreBtn.addEventListener('click', async () => {
  const posts = await fetchPosts();
  renderPosts(posts, true);
  if (posts.length < POSTS_PER_PAGE) loadMoreBtn.style.display = 'none';
});

// Fetch posts with user, likes, comments, and profiles
async function fetchPosts() {
  let query = supabase
    .from('posts')
    .select(`
      *,
      profiles!posts_user_id_fkey(username, avatar_url),
      likes!likes_post_id_fkey(user_id),
      comments!comments_post_id_fkey(
        *,
        profiles!comments_user_id_fkey(username, avatar_url)
      )
    `)
    .order('created_at', { ascending: false })
    .limit(POSTS_PER_PAGE);

  if (lastCreatedAt) {
    query = query.lt('created_at', lastCreatedAt);
  }

  const { data, error } = await query;
  if (error) {
    alert('Error loading posts.');
    return [];
  }

  if (data.length > 0) lastCreatedAt = data[data.length - 1].created_at;

  return data;
}

// Render posts
function renderPosts(posts, append = false) {
  if (!append) postsList.innerHTML = '';

  posts.forEach(post => {
    // Check if current user liked this post
    const likedByUser = post.likes.some(like => like.user_id === currentUser?.id);

    const avatar = post.profiles?.avatar_url
      ? `<img src="${post.profiles.avatar_url}" class="avatar" alt="Avatar">`
      : `<div class="avatar">${post.profiles?.username?.charAt(0) || '?'}</div>`;

    const image = post.image_url
      ? `<img src="${post.image_url}" class="post-image" alt="Post image">`
      : '';

    // Comments HTML
    const commentsHtml = (post.comments || []).map(comment => {
      const commentAvatar = comment.profiles?.avatar_url
        ? `<img src="${comment.profiles.avatar_url}" class="avatar" alt="Commenter avatar">`
        : `<div class="avatar">${comment.profiles?.username?.charAt(0) || '?'}</div>`;

      return `
      <li class="comment">
        ${commentAvatar}
        <div class="comment-content">
          <span class="comment-username">${escapeHtml(comment.profiles?.username || 'Anonymous')}</span>
          <p>${escapeHtml(comment.content)}</p>
        </div>
      </li>`;
    }).join('');

    // Post element
    const postEl = document.createElement('li');
    postEl.classList.add('post');
    postEl.innerHTML = `
      <div class="post-header">
        ${avatar}
        <span class="username">${escapeHtml(post.profiles?.username || 'Anonymous')}</span>
        <time class="timestamp">${new Date(post.created_at).toLocaleString()}</time>
      </div>
      <div class="content">${escapeHtml(post.content)}</div>
      ${image}

      <div class="post-actions">
        <button class="like-btn" data-post-id="${post.id}">
          ${likedByUser ? '❤️' : '🤍'} Like (${post.likes.length})
        </button>
      </div>

      <ul class="comments-list">${commentsHtml}</ul>

      <form class="comment-form" data-post-id="${post.id}">
        <input class="comment-input" type="text" placeholder="Add a comment..." required />
        <button type="submit">Send</button>
      </form>
    `;

    postsList.appendChild(postEl);

    // Add like button handler
    const likeBtn = postEl.querySelector('.like-btn');
    likeBtn.addEventListener('click', () => toggleLike(post.id, likedByUser));

    // Add comment form submit handler
    const commentForm = postEl.querySelector('.comment-form');
    commentForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = commentForm.querySelector('.comment-input');
      addComment(post.id, input);
    });
  });
}

// Setup realtime subscription to posts table for new posts
function setupRealtime() {
  supabase
    .channel('public:posts')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'posts' },
      payload => {
        // New post inserted - reload initial posts
        loadInitialPosts();
      }
    )
    .subscribe();
}

// Check user session and start
async function start() {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    window.location.href = 'login.html'; // redirect if not logged in
    return;
  }

  currentUser = user;

  // Load posts
  await loadInitialPosts();

  // Setup realtime updates
  setupRealtime();
}

start();