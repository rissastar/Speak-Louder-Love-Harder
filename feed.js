// Initialize Supabase client
const supabaseUrl = 'https://zgjfbbfnldxlvzstnfzy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnamZiYmZubGR4bHZ6c3RuZnp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NDczNzIsImV4cCI6MjA2NTIyMzM3Mn0.-Lt8UIAqI5ySoyyTGzRs3JVBhdcZc8zKxiLH6qbu3dU';
const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

// === DOM Elements ===
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

const POSTS_PER_PAGE = 10;

// === Topic Dropdown Toggle ===
topicToggleBtn.addEventListener('click', () => {
  const expanded = topicToggleBtn.getAttribute('aria-expanded') === 'true';
  topicToggleBtn.setAttribute('aria-expanded', !expanded);
  topicDropdown.classList.toggle('hidden');
});

// === Logout and Settings ===
logoutBtn.addEventListener('click', async () => {
  await supabase.auth.signOut();
  window.location.href = 'logout.html';
});

settingsBtn.addEventListener('click', () => {
  window.location.href = 'settings.html';
});

// === Image Preview ===
postImageInput.addEventListener('change', () => {
  const file = postImageInput.files[0];
  if (!file) return imagePreview.classList.add('hidden');

  const reader = new FileReader();
  reader.onload = e => {
    imagePreview.src = e.target.result;
    imagePreview.classList.remove('hidden');
  };
  reader.readAsDataURL(file);
});

// === Escape HTML ===
function escapeHtml(text) {
  return text.replace(/[&<>"']/g, match => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[match]
  ));
}

// === Fetch Posts ===
async function fetchPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*, profiles(username, avatar_url)')
    .order('created_at', { ascending: false })
    .limit(POSTS_PER_PAGE);

  if (error) {
    console.error('Error loading posts:', error);
    return [];
  }
  return data;
}

// === Render Posts ===
function renderPosts(posts) {
  postsList.innerHTML = '';
  posts.forEach(post => {
    const user = post.profiles || {};
    const avatar = user.avatar_url
      ? `<img src="${user.avatar_url}" class="avatar" alt="${user.username}'s avatar" />`
      : `<div class="avatar">${(user.username || '?')[0]}</div>`;

    const image = post.image_url
      ? `<img src="${post.image_url}" class="post-image" alt="Post Image" />`
      : '';

    const postItem = document.createElement('li');
    postItem.className = 'post';
    postItem.innerHTML = `
      <div class="post-header">
        ${avatar}
        <span class="username">${user.username || 'Unknown'}</span>
      </div>
      <div class="content">${escapeHtml(post.content || '')}</div>
      ${image}
    `;
    postsList.appendChild(postItem);
  });
}

// === Load Posts ===
async function loadInitialPosts() {
  const posts = await fetchPosts();
  renderPosts(posts);
}

// === Handle Form Submission ===
postForm.addEventListener('submit', async e => {
  e.preventDefault();
  const content = postContent.value.trim();
  const file = postImageInput.files[0];

  let image_url = null;
  if (file) {
    const filePath = `${Date.now()}-${file.name}`;
    const { error: uploadErr } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadErr) return alert('Image upload failed.');
    image_url = supabase.storage.from('images').getPublicUrl(filePath).publicURL;
  }

  const { error } = await supabase.from('posts').insert({ content, image_url });
  if (error) {
    alert('Failed to post.');
  } else {
    postForm.reset();
    imagePreview.classList.add('hidden');
    loadInitialPosts();
  }
});

// === Init ===
loadInitialPosts();