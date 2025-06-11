import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://ytgrzhtntwzefwjmhgjj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // truncated for clarity
export const supabase = createClient(supabaseUrl, supabaseKey);

// === Logout ===
export async function logout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (err) {
    console.error('Logout failed:', err.message);
  } finally {
    window.location.href = 'login.html';
  }
}

// === Auth Check ===
export async function checkAuth(redirectIfMissing = true) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session && redirectIfMissing) {
    window.location.href = 'login.html';
    return null;
  }
  return session;
}

// === Auth Page (Login/Register) ===
export async function initAuthPage() {
  const form = document.getElementById('auth-form');
  const emailInput = document.getElementById('email');
  const passInput = document.getElementById('password');
  const message = document.getElementById('message');
  const isRegister = window.location.pathname.includes('register');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passInput.value;
    const fn = isRegister ? supabase.auth.signUp : supabase.auth.signInWithPassword;
    const { error } = await fn({ email, password });

    if (error) {
      message.textContent = error.message;
      message.style.color = 'red';
    } else {
      message.textContent = isRegister
        ? 'Registered! Check your email to confirm.'
        : 'Logged in!';
      message.style.color = 'green';
      setTimeout(() => window.location.href = 'feed.html', 1000);
    }
  });
}

// === Feed Page ===
export async function initFeedPage() {
  const session = await checkAuth();
  if (!session) return;

  const postBtn = document.getElementById('post-btn');
  const postText = document.getElementById('post-text');
  const postType = document.getElementById('post-type');
  const postCategory = document.getElementById('post-category');
  const postImageInput = document.getElementById('post-image');
  const postsContainer = document.getElementById('posts');

  async function fetchPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select(`*, users: user_id (id, email, avatar_url, username)`)
      .order('inserted_at', { ascending: false });

    if (error) return console.error('Fetch error:', error);

    postsContainer.innerHTML = '';
    data.forEach(post => {
      const user = post.users || {};
      const username = user.username || user.email || 'Anonymous';
      const avatarUrl = user.avatar_url
        ? supabase.storage.from('avatars').getPublicUrl(user.avatar_url).publicUrl
        : 'default-avatar.png';
      const imageUrl = post.image_url
        ? supabase.storage.from('images').getPublicUrl(post.image_url).publicUrl
        : null;

      const postEl = document.createElement('div');
      postEl.className = 'post';
      postEl.innerHTML = `
        <div class="post-header">
          <img src="${avatarUrl}" alt="Avatar" class="avatar" />
          <strong>${username}</strong>
          <small>${post.category} • ${post.type}</small>
        </div>
        <p>${escapeHTML(post.text || '')}</p>
        ${imageUrl ? `<img src="${imageUrl}" class="post-image" />` : ''}
      `;
      postsContainer.appendChild(postEl);
    });
  }

  if (postBtn) {
    postBtn.addEventListener('click', async () => {
      const text = postText.value.trim();
      const type = postType.value;
      const category = postCategory.value;
      if (!category || !type) return alert('Select type and category.');

      let image_url = null;
      if (postImageInput.files.length > 0) {
        const file = postImageInput.files[0];
        const fileName = `${session.user.id}_${Date.now()}.${file.name.split('.').pop()}`;
        const { data, error } = await supabase.storage.from('images').upload(fileName, file);
        if (error) return alert('Image upload failed: ' + error.message);
        image_url = data.path;
      }

      const { error } = await supabase.from('posts').insert({
        user_id: session.user.id, text, type, category, image_url
      });
      if (error) return alert('Post failed: ' + error.message);

      postText.value = '';
      postImageInput.value = '';
      postType.value = '';
      postCategory.value = '';
      fetchPosts();
    });
  }

  // Real-time updates
  supabase
    .channel('public:posts')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, fetchPosts)
    .subscribe();

  fetchPosts();
}

// === Profile Page ===
export async function initProfilePage(isPublic = false) {
  const session = await checkAuth(!isPublic);
  if (!session && !isPublic) return;

  const userId = isPublic
    ? new URLSearchParams(location.search).get('user_id')
    : session.user.id;

  const { data: profile, error } = await supabase
    .from('users')
    .select('id, email, avatar_url, username')
    .eq('id', userId)
    .single();

  if (error || !profile) {
    document.getElementById('profile-container').textContent = 'User not found.';
    return;
  }

  const avatarUrl = profile.avatar_url
    ? supabase.storage.from('avatars').getPublicUrl(profile.avatar_url).publicUrl
    : 'default-avatar.png';

  document.getElementById('profile-avatar').src = avatarUrl;
  document.getElementById('profile-username').textContent = profile.username || profile.email;
  document.getElementById('profile-email').textContent = profile.email;

  const { data: posts, error: postsError } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', userId)
    .order('inserted_at', { ascending: false });

  const postsContainer = document.getElementById('user-posts');
  if (postsError) return (postsContainer.textContent = 'Error loading posts.');
  postsContainer.innerHTML = '';
  posts.forEach(post => {
    const imageUrl = post.image_url
      ? supabase.storage.from('images').getPublicUrl(post.image_url).publicUrl
      : null;
    const postEl = document.createElement('div');
    postEl.className = 'post';
    postEl.innerHTML = `
      <small>${post.category} • ${post.type}</small>
      <p>${escapeHTML(post.text || '')}</p>
      ${imageUrl ? `<img src="${imageUrl}" class="post-image" />` : ''}
    `;
    postsContainer.appendChild(postEl);
  });
}

// === Escape HTML ===
function escapeHTML(text) {
  return text.replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));
}

// === Mobile Topic Dropdown ===
function initMobileDropdown() {
  const topicsBtn = document.getElementById('topics-btn');
  const dropdown = document.getElementById('topics-dropdown');

  if (topicsBtn && dropdown) {
    topicsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });

    dropdown.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => dropdown.classList.remove('show'));
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && !topicsBtn.contains(e.target)) {
        dropdown.classList.remove('show');
      }
    });
  }
}

// === Init ===
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;

  if (path.includes('login.html') || path.includes('register.html')) {
    initAuthPage();
  } else if (path.includes('feed.html')) {
    initFeedPage();
  } else if (path.includes('profile.html')) {
    initProfilePage(false);
  } else if (path.includes('public-profile.html')) {
    initProfilePage(true);
  }

  initMobileDropdown();

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const profilePicPreview = document.getElementById("profile-picture-preview");
  const profilePicInput = document.getElementById("profile-picture-input");

  if (profilePicPreview && profilePicInput) {
    profilePicPreview.addEventListener("click", () => profilePicInput.click());
    profilePicPreview.addEventListener("keypress", e => {
      if (e.key === "Enter" || e.key === " ") profilePicInput.click();
    });

    profilePicInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        profilePicPreview.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  const settingsForm = document.getElementById("settings-form");
  if (settingsForm) {
    settingsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Settings saved (demo only). Backend integration coming soon!");
    });
  }
});