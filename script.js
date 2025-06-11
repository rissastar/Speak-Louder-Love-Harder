// Supabase init
const SUPABASE_URL = 'https://ytgrzhtntwzefwjmhgjj.supabase.co';
const SUPABASE_ANON = 'eyJh...W4bdbL8';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

// Utility: get current session
async function checkAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

// Auth pages
async function initAuthPage() {
  const path = window.location.pathname;
  const isRegister = path.includes('register');
  document.getElementById('page-title').textContent = isRegister ? 'Register' : 'Login';
  document.getElementById('form-title').textContent = isRegister ? 'Create Account' : 'Login';
  document.getElementById('submit-btn').textContent = isRegister ? 'Register' : 'Login';
  document.getElementById('toggle-text').innerHTML = isRegister ?
    'Already have an account? <a href="login.html">Login</a>' :
    'Don’t have an account? <a href="register.html">Register</a>';
  document.getElementById('auth-form').addEventListener('submit', async e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    const fn = isRegister ? 'signUp' : 'signInWithPassword';
    const { error } = isRegister
      ? await supabase.auth.signUp({ email, password: pass })
      : await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) return alert(error.message);
    window.location.href = 'feed.html';
  });
}

// Feed, post creation, real-time updates
async function initFeedPage() {
  const session = await checkAuth();
  if (!session) return window.location.href = 'login.html';
  document.getElementById('logout-btn').addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.href = 'login.html';
  });

  // Posting
  document.getElementById('post-btn').addEventListener('click', async () => {
    const text = document.getElementById('post-text').value;
    const imgFile = document.getElementById('post-image').files[0];
    const category = window.category || document.getElementById('post-category').value;

    let image_url = null;
    if (imgFile) {
      const { data, error:uploadErr } = await supabase.storage
        .from('images')
        .upload(`posts/${Date.now()}_${imgFile.name}`, imgFile);
      if (uploadErr) return alert(uploadErr.message);
      image_url = data.path;
    }

    await supabase.from('posts').insert([
      { text, image_url, category, user_id: session.user.id }
    ]);
    document.getElementById('post-text').value = '';
    document.getElementById('post-image').value = '';
  });

  // Real-time
  supabase.channel('posts-ch')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, fetchPosts)
    .subscribe();

  async function fetchPosts() {
    let query = supabase
      .from('posts')
      .select('id, text, image_url, category, inserted_at, user_id, users(email)')
      .order('inserted_at', { ascending: false });
    if (window.category) query = query.eq('category', window.category);
    const { data, error } = await query;
    if (error) console.error(error);
    const container = document.getElementById('posts');
    container.innerHTML = '';
    for (let p of data) {
      const postEl = document.createElement('div');
      postEl.className = 'post';
      postEl.innerHTML = `
        <p><strong>${p.users.email}</strong> <em>${new Date(p.inserted_at).toLocaleString()}</em></p>
        <p>${p.text}</p>
        ${p.image_url ? `<img src="${supabase.storage.from('images').getPublicUrl(p.image_url).publicUrl}" />` : ''}
        <button class="like-btn" data-id="${p.id}">Like</button>
        <button class="comment-btn" data-id="${p.id}">Comment</button>
        <div class="comments" id="comments-${p.id}"></div>
      `;
      container.appendChild(postEl);
      hookLikes(p.id);
      loadComments(p.id);
    }
  }

  // Likes
  async function hookLikes(postId) {
    document.querySelector(`.like-btn[data-id="${postId}"]`)
      .addEventListener('click', async () => {
        await supabase.from('likes').insert([
          { user_id: session.user.id, post_id: postId }
        ]);
      });
  }

  // Comments
  function loadComments(postId) {
    supabase.channel(`comments-${postId}`)
      .on('postgres_changes',{ event: '*', schema:'public', table:'comments', filter:`post_id=eq.${postId}` },
        payload => renderComment(postId, payload.new))
      .subscribe();
    renderExistingComments(postId);
  }
  async function renderExistingComments(postId) {
    const { data, error } = await supabase
      .from('comments')
      .select('id, text, inserted_at, user_id, users(email)')
      .eq('post_id', postId)
      .order('inserted_at', { ascending:true });
    if (!error) data.forEach(c => renderComment(postId, c));
    const container = document.getElementById(`comments-${postId}`);
    const input = document.createElement('input');
    input.placeholder = 'Write comment…';
    input.addEventListener('keypress', async e => {
      if (e.key === 'Enter') {
        await supabase.from('comments').insert([{ text: e.target.value, user_id: session.user.id, post_id: postId }]);
        e.target.value = '';
      }
    });
    container.appendChild(input);
  }
  function renderComment(postId, comment) {
    const container = document.getElementById(`comments-${postId}`);
    const div = document.createElement('div');
    div.textContent = `${comment.users.email}: ${comment.text}`;
    container.appendChild(div);
  }

  fetchPosts();
}

// Profile page
async function initProfilePage(isPublic=false) {
  const session = await checkAuth();
  if (!session && !isPublic) return window.location.href = 'login.html';
  const userId = isPublic ? new URLSearchParams(location.search).get('user_id') : session.user.id;

  const { data:profile } = await supabase.from('users').select('id,email,avatar_url').eq('id', userId).single();
  document.getElementById('profile-avatar').src = profile.avatar_url || 'default-avatar.png';
  document.getElementById('profile-name').textContent = profile.email;
  document.getElementById('profile-email').textContent = profile.email;

  const { data: posts } = await supabase.from('posts')
    .select('id,text,image_url,inserted_at')
    .eq('user_id', userId)
    .order('inserted_at', { ascending: false });
  const container = document.getElementById(isPublic ? 'user-posts' : 'user-posts');
  posts.forEach(p => {
    const div = document.createElement('div');
    div.className = 'post';
    div.innerHTML = `
      <p><em>${new Date(p.inserted_at).toLocaleString()}</em></p>
      <p>${p.text}</p>
      ${p.image_url ? `<img src="${supabase.storage.from('images').getPublicUrl(p.image_url).publicUrl}" />` : ''}
    `;
    container.appendChild(div);
  });

  if (!isPublic) {
    document.getElementById('logout-btn').addEventListener('click', async () => {
      await supabase.auth.signOut();
      window.location.href = 'login.html';
    });
  }
}

// Boot
document.addEventListener('DOMContentLoaded', () => {
  const p = window.location.pathname.split('/').pop();
  if (p === 'login.html' || p === 'register.html') initAuthPage();
  else if (p === 'feed.html') initFeedPage();
  else if (p === 'profile.html') initProfilePage();
  else if (p === 'public-profile.html') initProfilePage(true);
  else if (p.endsWith('.html') && window.category) initFeedPage();
});

function toggleTheme() {
  const current = localStorage.getItem('theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
});