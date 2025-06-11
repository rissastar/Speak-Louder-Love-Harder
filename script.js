// === Supabase Setup ===
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://ytgrzhtntwzefwjmhgjj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8'
);

// === Universal Logout ===
async function logoutUser(redirectTo = 'index.html') {
  await supabase.auth.signOut();
  window.location.href = redirectTo;
}
window.logoutUser = logoutUser;

// === Check if logged in ===
async function checkAuth(redirect = true) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session && redirect) window.location.href = 'login.html';
  return session;
}

// === Auth Page (Login/Register) ===
async function initAuthPage() {
  const path = window.location.pathname;
  const isRegister = path.includes('register');

  const form = document.getElementById('auth-form');
  const emailInput = document.getElementById('email');
  const passInput = document.getElementById('password');
  const message = document.getElementById('message');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passInput.value;
    const fn = isRegister ? supabase.auth.signUp : supabase.auth.signInWithPassword;
    const { error } = await fn({ email, password });
    if (error) {
      message.textContent = error.message;
      message.style.color = 'red';
    } else {
      message.textContent = isRegister ? 'Registered! Check your email.' : 'Logged in!';
      message.style.color = 'green';
      setTimeout(() => (window.location.href = 'feed.html'), 1000);
    }
  });
}

// === Feed Page ===
async function initFeedPage() {
  const session = await checkAuth();

  const postBtn = document.getElementById('post-btn');
  postBtn?.addEventListener('click', async () => {
    const text = document.getElementById('post-text').value;
    const type = document.getElementById('post-type').value;
    const category = document.getElementById('post-category').value;
    const image = document.getElementById('post-image')?.files[0];

    if (!category) return alert('Please select a page/topic to post into.');
    let image_url = null;

    if (image) {
      const { data, error } = await supabase.storage
        .from('images')
        .upload(`posts/${Date.now()}_${image.name}`, image);
      if (error) return alert(error.message);
      image_url = data.path;
    }

    const { error } = await supabase.from('posts').insert({
      user_id: session.user.id,
      text,
      type,
      category,
      image_url
    });

    if (error) return alert(error.message);
    document.getElementById('post-text').value = '';
    document.getElementById('post-image').value = '';
  });

  fetchPosts();
  supabase
    .channel('posts')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, fetchPosts)
    .subscribe();
}

async function fetchPosts() {
  const container = document.getElementById('posts');
  const { data, error } = await supabase
    .from('posts')
    .select('*, users(email)')
    .order('inserted_at', { ascending: false });

  if (error) return console.error(error);

  container.innerHTML = '';
  data.forEach(post => {
    const postEl = document.createElement('div');
    postEl.className = 'post';
    const imageUrl = post.image_url
      ? supabase.storage.from('images').getPublicUrl(post.image_url).publicUrl
      : null;

    postEl.innerHTML = `
      <h4>${post.users?.email || 'User'}</h4>
      <small><em>${post.category} • ${post.type}</em></small>
      <p>${post.text}</p>
      ${imageUrl ? `<img src="${imageUrl}" alt="Post Image"/>` : ''}
    `;
    container.appendChild(postEl);
  });
}

// === Profile Page (Your Profile & Public) ===
async function initProfilePage(isPublic = false) {
  const session = await checkAuth(!isPublic);
  const userId = isPublic
    ? new URLSearchParams(location.search).get('user_id')
    : session.user.id;

  const { data: user } = await supabase
    .from('users')
    .select('id, email, avatar_url')
    .eq('id', userId)
    .single();

  document.getElementById('profile-avatar').src = user?.avatar_url || 'https://via.placeholder.com/100';
  document.getElementById('profile-name').textContent = user?.email || 'Anonymous';
  if (!isPublic) document.getElementById('profile-email').textContent = user?.email || '';

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', userId)
    .order('inserted_at', { ascending: false });

  const container = document.getElementById('user-posts');
  container.innerHTML = '';
  posts.forEach(post => {
    const imageUrl = post.image_url
      ? supabase.storage.from('images').getPublicUrl(post.image_url).publicUrl
      : null;

    const el = document.createElement('div');
    el.className = 'post';
    el.innerHTML = `
      <small><em>${post.category} • ${post.type}</em></small>
      <p>${post.text}</p>
      ${imageUrl ? `<img src="${imageUrl}" />` : ''}
    `;
    container.appendChild(el);
  });
}

// === Boot Loader ===
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  if (path.includes('login.html') || path.includes('register.html')) initAuthPage();
  else if (path.includes('feed.html')) initFeedPage();
  else if (path.includes('profile.html')) initProfilePage();
  else if (path.includes('public-profile.html')) initProfilePage(true);

  // Attach logout if present
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) logoutBtn.addEventListener('click', () => logoutUser());
});