const supabaseUrl = 'https://zgjfbbfnldxlvzstnfzy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnamZiYmZubGR4bHZ6c3RuZnp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NDczNzIsImV4cCI6MjA2NTIyMzM3Mn0.-Lt8UIAqI5ySoyyTGzRs3JVBhdcZc8zKxiLH6qbu3dU';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

const postForm = document.getElementById('post-form');
const postContent = document.getElementById('post-content');
const postImage = document.getElementById('post-image');
const feedContainer = document.getElementById('feed');

// Check auth and redirect if not logged in
async function checkAuth() {
  const { data, error } = await supabase.auth.getSession();
  if (!data.session) window.location.href = 'login.html';
}
checkAuth();

// Load current user info
let currentUser = null;
async function loadUser() {
  const { data: { user } } = await supabase.auth.getUser();
  currentUser = user;
}
await loadUser();

// Create a new post
postForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = postContent.value.trim();
  if (!text && !postImage.files[0]) return;

  let imageUrl = null;
  if (postImage.files.length > 0) {
    const file = postImage.files[0];
    const filePath = `${currentUser.id}/${Date.now()}-${file.name}`;
    const { data, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) {
      alert('Image upload failed!');
      return;
    }
    const { data: publicUrl } = supabase.storage.from('avatars').getPublicUrl(filePath);
    imageUrl = publicUrl.publicUrl;
  }

  await supabase.from('posts').insert([
    {
      content: text,
      image_url: imageUrl,
      user_id: currentUser.id
    }
  ]);
  postContent.value = '';
  postImage.value = '';
});

// Fetch and display posts
async function loadFeed() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*, profiles(username, avatar_url)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading feed:', error);
    return;
  }

  feedContainer.innerHTML = '';
  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');

    const avatar = post.profiles?.avatar_url || 'default-avatar.png';
    const username = post.profiles?.username || 'Anonymous';
    const content = post.content;
    const image = post.image_url ? `<img src="${post.image_url}" class="post-image" alt="Post image">` : '';

    postEl.innerHTML = `
      <div class="post-header">
        <img src="${avatar}" class="avatar-sm" alt="${username}">
        <span class="username">${username}</span>
      </div>
      <div class="post-body">
        <p>${content}</p>
        ${image}
      </div>
      <div class="post-footer">
        <button class="like-button">❤️ Like</button>
        <span class="timestamp">${new Date(post.created_at).toLocaleString()}</span>
      </div>
    `;
    feedContainer.appendChild(postEl);
  });
}
loadFeed();

// Listen for real-time updates
supabase
  .channel('public:posts')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, payload => {
    console.log('Change received!', payload);
    loadFeed();
  })
  .subscribe();