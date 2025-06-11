// === Supabase Setup ===
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://ytgrzhtntwzefwjmhgjj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8';
export const supabase = createClient(supabaseUrl, supabaseKey);

// Utility: get current session
async function checkAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

// Auth pages (login/register)
async function initAuthPage() {
  const path = window.location.pathname;
  const isRegister = path.includes('register');
  document.getElementById('page-title').textContent = isRegister ? 'Register' : 'Login';
  document.getElementById('form-title').textContent = isRegister ? 'Create Account' : 'Login';
  document.getElementById('submit-btn').textContent = isRegister ? 'Register' : 'Login';
  document.getElementById('toggle-text').innerHTML = isRegister
    ? 'Already have an account? <a href="login.html">Login</a>'
    : 'Don’t have an account? <a href="register.html">Register</a>';

  document.getElementById('auth-form').addEventListener('submit', async e => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const pass = document.getElementById('password').value;

    const { error } = isRegister
      ? await supabase.auth.signUp({ email, password: pass })
      : await supabase.auth.signInWithPassword({ email, password: pass });

    if (error) return alert(error.message);

    window.location.href = 'feed.html';
  });
}

// Feed page: posts, realtime updates, logout
async function initFeedPage() {
  const session = await checkAuth();
  if (!session) return window.location.href = 'login.html';

  // Logout button
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.style.display = 'inline-block';
    logoutBtn.addEventListener('click', async () => {
      await supabase.auth.signOut();
      window.location.href = 'login.html';
    });
  }

  // Post creation
  document.getElementById('post-btn').addEventListener('click', async () => {
    const text = document.getElementById('post-text').value.trim();
    if (!text) return alert('Post text cannot be empty');

    const imgFile = document.getElementById('post-image').files[0];
    const category = document.getElementById('post-category').value;

    let image_url = null;
    if (imgFile) {
      const filePath = `posts/${Date.now()}_${imgFile.name}`;
      const { data, error: uploadErr } = await supabase.storage
        .from('images')
        .upload(filePath, imgFile);
      if (uploadErr) return alert(uploadErr.message);
      image_url = data.path;
    }

    const { error } = await supabase.from('posts').insert([
      { text, image_url, category, user_id: session.user.id }
    ]);

    if (error) return alert(error.message);

    // Clear inputs
    document.getElementById('post-text').value = '';
    document.getElementById('post-image').value = '';
  });

  // Real-time subscription to posts updates
  // Clean subscription before subscribing again to avoid duplicates
  if (window.postsSubscription) {
    await supabase.removeChannel(window.postsSubscription);
  }
  window.postsSubscription = supabase.channel('posts-ch')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, fetchPosts)
    .subscribe();

  // Fetch and render posts
  async function fetchPosts() {
    let query = supabase
      .from('posts')
      .select('id, text, image_url, category, inserted_at, user_id, users(email)')
      .order('inserted_at', { ascending: false });

    if (window.category) query = query.eq('category', window.category);

    const { data, error } = await query;
    if (error) return console.error(error);

    const container = document.getElementById('posts');
    container.innerHTML = '';

    for (const p of data) {
      const postEl = document.createElement('div');
      postEl.className = 'post';

      // Get public URL for image if present
      const imageUrl = p.image_url ? supabase.storage.from('images').getPublicUrl(p.image_url).publicUrl : '';

      postEl.innerHTML = `
        <p><strong>${p.users?.email ?? 'Unknown User'}</strong> <em>${new Date(p.inserted_at).toLocaleString()}</em></p>
        <p>${p.text}</p>
        ${imageUrl ? `<img src="${imageUrl}" alt="Post image" />` : ''}
        <button class="like-btn" data-id="${p.id}">Like</button>
        <button class="comment-btn" data-id="${p.id}">Comment</button>
        <div class="comments" id="comments-${p.id}"></div>
      `;

      container.appendChild(postEl);

      hookLikes(p.id);
      loadComments(p.id);
    }
  }

  // Likes functionality
  async function hookLikes(postId) {
    const btn = document.querySelector(`.like-btn[data-id="${postId}"]`);
    if (!btn) return;

    btn.addEventListener('click', async () => {
      const { error } = await supabase.from('likes').insert([
        { user_id: session.user.id, post_id: postId }
      ]);
      if (error) return alert(error.message);
      alert('Liked!');
    });
  }

  // Comments real-time & UI
  function loadComments(postId) {
    // Clean old subscription if any to avoid duplicates
    if (window[`commentsSubscription_${postId}`]) {
      supabase.removeChannel(window[`commentsSubscription_${postId}`]);
    }

    window[`commentsSubscription_${postId}`] = supabase.channel(`comments-${postId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'comments', filter: `post_id=eq.${postId}` }, payload => {
        renderComment(postId, payload.new);
      })
      .subscribe();

    renderExistingComments(postId);
  }

  async function renderExistingComments(postId) {
    const { data, error } = await supabase
      .from('comments')
      .select('id, text, inserted_at, user_id, users(email)')
      .eq('post_id', postId)
      .order('inserted_at', { ascending: true });
    if (error) return console.error(error);

    const container = document.getElementById(`comments-${postId}`);
    container.innerHTML = ''; // clear old comments before rendering

    for (const c of data) {
      renderComment(postId, c);
    }

    // Add input box for new comment
    const input = document.createElement('input');
    input.placeholder = 'Write comment…';
    input.addEventListener('keypress', async e => {
      if (e.key === 'Enter' && input.value.trim()) {
        await supabase.from('comments').insert([{ text: input.value.trim(), user_id: session.user.id, post_id: postId }]);
        input.value = '';
      }
    });
    container.appendChild(input);
  }

  function renderComment(postId, comment) {
    const container = document.getElementById(`comments-${postId}`);
    const div = document.createElement('div');
    div.textContent = `${comment.users?.email ?? 'Unknown'}: ${comment.text}`;
    container.insertBefore(div, container.lastElementChild); // insert above input box
  }

  // Initial load
  fetchPosts();
}

// Profile page (public or private)
async function initProfilePage(isPublic = false) {
  const session = await checkAuth();
  if (!session && !isPublic) return window.location.href = 'login.html';

  const userId = isPublic ? new URLSearchParams(location.search).get('user_id') : session.user.id;

  const { data: profile, error } = await supabase.from('users').select('id,email,avatar_url').eq('id', userId).single();
  if (error) return console.error(error);

  document.getElementById('profile-avatar').src = profile.avatar_url || 'default-avatar.png';
  document.getElementById('profile-name').textContent = profile.email;
  document.getElementById('profile-email').textContent = profile.email;

  const { data: posts, error: postsErr } = await supabase.from('posts')
    .select('id,text,image_url,inserted_at')
    .eq('user_id', userId)
    .order('inserted_at', { ascending: false });

  if (postsErr) return console.error(postsErr);

  const container = document.getElementById('user-posts');
  container.innerHTML = '';

  posts.forEach(p => {
    const imageUrl = p.image_url ? supabase.storage.from('images').getPublicUrl(p.image_url).publicUrl : '';
    const div = document.createElement('div');
    div.className = 'post';
    div.innerHTML = `
      <p><em>${new Date(p.inserted_at).toLocaleString()}</em></p>
      <p>${p.text}</p>
      ${imageUrl ? `<img src="${imageUrl}" alt="Post image" />` : ''}
    `;
    container.appendChild(div);
  });

  if (!isPublic) {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.style.display = 'inline-block';
      logoutBtn.addEventListener('click', async () => {
        await supabase.auth.signOut();
        window.location.href = 'login.html';
      });
    }
  }
}

// Boot: detect page and initialize
document.addEventListener('DOMContentLoaded', () => {
  const p = window.location.pathname.split('/').pop();
  if (p === 'login.html' || p === 'register.html') initAuthPage();
  else if (p === 'feed.html') initFeedPage();
  else if (p === 'profile.html') initProfilePage();
  else if (p === 'public-profile.html') initProfilePage(true);
  else if (p.endsWith('.html') && window.category) initFeedPage();
});