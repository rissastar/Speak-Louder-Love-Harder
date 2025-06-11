const SUPABASE_URL = 'https://ytgrzhtntwzefwjmhgjj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZWZfYW5vbiIsImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Utility
async function getUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// DOM Elements
const composer = document.getElementById('post-composer');
const feed = document.getElementById('feed');
const authButtons = document.getElementById('auth-buttons');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');

// Setup Page
document.addEventListener('DOMContentLoaded', async () => {
  const user = await getUser();
  loginBtn.style.display = user ? 'none' : 'inline-block';
  registerBtn.style.display = user ? 'none' : 'inline-block';
  logoutBtn.style.display = user ? 'inline-block' : 'none';

  buildComposer(user);
  loadFeed();

  document.querySelectorAll('nav a').forEach(link => {
    link.onclick = e => {
      e.preventDefault();
      loadFeed(link.dataset.topic);
    };
  });
});

// Build Composer
function buildComposer(user) {
  if (!user) {
    composer.innerHTML = `<p>Please <a href="login.html">login</a> to post.</p>`;
    return;
  }
  composer.innerHTML = `
    <select id="postType">
      <option value="story">Story</option>
      <option value="quote">Quote</option>
      <option value="affirmation">Affirmation</option>
      <option value="worksheet">Worksheet</option>
      <option value="grounding">Grounding Technique</option>
    </select>
    <select id="postCategory">
      <option value="mental-health">Mental Health</option>
      <option value="addiction">Addiction</option>
      <option value="cystic-fibrosis">Cystic Fibrosis</option>
      <option value="cirrhosis">Cirrhosis</option>
      <option value="physical-abuse">Physical Abuse</option>
      <option value="mental-abuse">Mental Abuse</option>
      <option value="sexual-abuse">Sexual Abuse</option>
      <option value="pitbull-love">Pitbull Love</option>
      <option value="foster-children">Foster Children</option>
    </select>
    <textarea id="postContent" placeholder="Write something..."></textarea>
    <input type="file" id="postImage" accept="image/*" />
    <button id="submitPost">Post</button>
  `;
  document.getElementById('submitPost').onclick = handlePost;
}

// Handle Post
async function handlePost() {
  const user = await getUser();
  if (!user) return alert('Log in to post.');

  const type = document.getElementById('postType').value;
  const category = document.getElementById('postCategory').value;
  const content = document.getElementById('postContent').value.trim();
  const file = document.getElementById('postImage').files[0];

  if (!content) return alert('Please add content.');

  let image_url = null;
  if (file) {
    const path = `images/${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage.from('uploads').upload(path, file);
    if (error) return alert('Upload failed.');
    image_url = `${SUPABASE_URL}/storage/v1/object/public/uploads/${path}`;
  }

  const { error } = await supabase.from('posts').insert([{ user_id: user.id, content, post_type: type, category, image_url }]);
  if (error) return alert('Failed to post.');

  document.getElementById('postContent').value = '';
  document.getElementById('postImage').value = '';
  loadFeed();
}

// Load Feed
async function loadFeed(topic = null) {
  const query = supabase.from('posts').select('*, profiles(username)').order('created_at', { ascending: false });
  if (topic) query.eq('category', topic);
  const { data } = await query;
  
  feed.innerHTML = data.length ? data.map(post => `
    <div class="post">
      <h3>${post.post_type} • ${post.category.replace('-', ' ')}</h3>
      <p><strong>${post.profiles?.username || 'Anon'}</strong> – ${new Date(post.created_at).toLocaleString()}</p>
      <p>${post.content}</p>
      ${post.image_url ? `<img src="${post.image_url}" alt="Post image">` : ''}
    </div>
  `).join('') : '<p>No posts here yet.</p>';
}

// Logout
logoutBtn.onclick = async () => {
  await supabase.auth.signOut();
  window.location.reload();
};