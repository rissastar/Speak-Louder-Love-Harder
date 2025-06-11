import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Initialize Supabase client
const supabaseUrl = 'https://ytgrzhtntwzefwjmhgjj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8';
export const supabase = createClient(supabaseUrl, supabaseKey);

// === Logout Function (Universal) ===
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

// === Check Auth ===
export async function checkAuth(redirectIfMissing = true) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session && redirectIfMissing) {
    window.location.href = 'login.html';
    return null;
  }
  return session;
}

// === Auth Page Logic ===
export async function initAuthPage() {
  const path = window.location.pathname;
  const isRegister = path.includes('register');
  const form = document.getElementById('auth-form');
  const emailInput = document.getElementById('email');
  const passInput = document.getElementById('password');
  const message = document.getElementById('message');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passInput.value;
    const fn = isRegister
      ? supabase.auth.signUp
      : supabase.auth.signInWithPassword;
    const { error } = await fn({ email, password });
    if (error) {
      message.textContent = error.message;
      message.style.color = 'red';
    } else {
      message.textContent = isRegister
        ? 'Registered! Check your email to confirm.'
        : 'Logged in!';
      message.style.color = 'green';
      setTimeout(() => (window.location.href = 'feed.html'), 1000);
    }
  });
}

// === Feed Page Logic ===
export async function initFeedPage() {
  const session = await checkAuth();
  if (!session) return;

  // Elements
  const postBtn = document.getElementById('post-btn');
  const postText = document.getElementById('post-text');
  const postType = document.getElementById('post-type');
  const postCategory = document.getElementById('post-category');
  const postImageInput = document.getElementById('post-image');
  const postsContainer = document.getElementById('posts');

  if (!postsContainer) return;

  // Fetch and render posts
  async function fetchPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        users: user_id (
          id,
          email,
          avatar_url,
          username
        )
      `)
      .order('inserted_at', { ascending: false });

    if (error) {
      console.error('Fetch posts error:', error);
      return;
    }

    postsContainer.innerHTML = '';
    data.forEach((post) => {
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
        <div class="post-header" style="display:flex; align-items:center; gap:0.8rem;">
          <img src="${avatarUrl}" alt="Avatar" style="width:40px; height:40px; border-radius:50%; object-fit:cover;" />
          <strong>${username}</strong>
          <small style="margin-left:auto; font-style:italic; color:#666;">${post.category} • ${post.type}</small>
        </div>
        <p>${post.text ? escapeHTML(post.text) : ''}</p>
        ${
          imageUrl
            ? `<img src="${imageUrl}" alt="Post Image" style="margin-top:0.6rem; max-width:100%; border-radius:10px;" />`
            : ''
        }
      `;
      postsContainer.appendChild(postEl);
    });
  }

  // Escape HTML helper
  function escapeHTML(text) {
    return text.replace(/[&<>"']/g, function (m) {
      return (
        {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        }[m] || m
      );
    });
  }

  // Post button event
  if (postBtn) {
    postBtn.addEventListener('click', async () => {
      const text = postText.value.trim();
      const type = postType.value;
      const category = postCategory.value;

      if (!category) return alert('Please select a page topic/category.');
      if (!type) return alert('Please select a post type.');

      let image_url = null;
      if (postImageInput && postImageInput.files.length > 0) {
        const file = postImageInput.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${session.user.id}_${Date.now()}.${fileExt}`;
        const { data, error } = await supabase.storage
          .from('images')
          .upload(fileName, file);

        if (error) {
          alert('Image upload failed: ' + error.message);
          return;
        }
        image_url = data.path;
      }

      const { error } = await supabase.from('posts').insert({
        user_id: session.user.id,
        text,
        type,
        category,
        image_url,
      });

      if (error) {
        alert('Failed to create post: ' + error.message);
        return;
      }

      postText.value = '';
      postImageInput.value = '';
      postType.value = '';
      postCategory.value = '';

      fetchPosts();
    });
  }

  // Real-time subscription to posts table
  supabase
    .channel('public:posts')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'posts' },
      () => {
        fetchPosts();
      }
    )
    .subscribe();

  // Initial load
  fetchPosts();
}

// === Profile Page Logic ===
export async function initProfilePage(isPublic = false) {
  const session = await checkAuth(!isPublic);
  if (!session && !isPublic) return;

  const userId = isPublic
    ? new URLSearchParams(location.search).get('user_id')
    : session.user.id;

  if (!userId) {
    document.getElementById('profile-container').textContent =
      'User not found.';
    return;
  }

  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('id, email, avatar_url, username')
    .eq('id', userId)
    .single();

  if (profileError || !profile) {
    document.getElementById('profile-container').textContent =
      'Error loading profile.';
    return;
  }

  const avatarUrl = profile.avatar_url
    ? supabase.storage.from('avatars').getPublicUrl(profile.avatar_url).publicUrl
    : 'default-avatar.png';

  // Profile elements
  const avatarEl = document.getElementById('profile-avatar');
  const usernameEl = document.getElementById('profile-username');
  const emailEl = document.getElementById('profile-email');
  const postsContainer = document.getElementById('user-posts');

  if (avatarEl) avatarEl.src = avatarUrl;
  if (usernameEl) usernameEl.textContent = profile.username || profile.email;
  if (emailEl) emailEl.textContent = profile.email;

  // Fetch user posts
  const { data: posts, error: postsError } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', userId)
    .order('inserted_at', { ascending: false });

  if (postsError) {
    if (postsContainer) postsContainer.textContent = 'Failed to load posts.';
    return;
  }

  if (!postsContainer) return;

  postsContainer.innerHTML = '';
  posts.forEach((post) => {
    const imageUrl = post.image_url
      ? supabase.storage.from('images').getPublicUrl(post.image_url).publicUrl
      : null;

    const postEl = document.createElement('div');
    postEl.className = 'post';
    postEl.innerHTML = `
      <small style="font-style:italic; color:#666;">${post.category} • ${post.type}</small>
      <p>${post.text ? escapeHTML(post.text) : ''}</p>
      ${
        imageUrl
          ? `<img src="${imageUrl}" alt="Post Image" style="margin-top:0.6rem; max-width:100%; border-radius:10px;" />`
          : ''
      }
    `;
    postsContainer.appendChild(postEl);
  });

  // Escape HTML helper
  function escapeHTML(text) {
    return text.replace(/[&<>"']/g, function (m) {
      return (
        {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        }[m] || m
      );
    });
  }
}

// === Initialize on DOM load ===
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

  // Bind universal logout button if exists
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logout();
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const topicsBtn = document.getElementById('topics-btn');
  const dropdown = document.getElementById('topics-dropdown');

  if (topicsBtn && dropdown) {
    // Toggle dropdown
    topicsBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent immediate outside close
      dropdown.classList.toggle('show');
    });

    // Close when clicking any topic link
    dropdown.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        dropdown.classList.remove('show');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && !topicsBtn.contains(e.target)) {
        dropdown.classList.remove('show');
      }
    });
  }
});