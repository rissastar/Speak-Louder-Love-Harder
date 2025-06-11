import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://ytgrzhtntwzefwjmhgjj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8';

const supabase = createClient(supabaseUrl, supabaseKey);

const profileAvatar = document.getElementById('profile-avatar');
const avatarInput = document.getElementById('avatar-input');
const displayNameInput = document.getElementById('display-name');
const profileEmail = document.getElementById('profile-email');
const saveProfileBtn = document.getElementById('save-profile-btn');
const profileMessage = document.getElementById('profile-message');
const postsContainer = document.getElementById('posts-container');
const logoutBtn = document.getElementById('logout-btn');

let userId;
let userData;

// Check auth and load profile
async function loadProfile() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = 'login.html';
    return;
  }
  userId = session.user.id;

  // Load user metadata (profile)
  const { data, error } = await supabase
    .from('users')
    .select('id, email, display_name, avatar_url')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error loading user data:', error.message);
    profileMessage.textContent = 'Failed to load profile data.';
    profileMessage.style.color = 'red';
    return;
  }

  userData = data;

  profileEmail.textContent = data.email;
  displayNameInput.value = data.display_name || '';
  profileAvatar.src = data.avatar_url
    ? supabase.storage.from('avatars').getPublicUrl(data.avatar_url).publicUrl
    : 'default-avatar.png';
}

// Upload avatar image and update profile
async function uploadAvatar(file) {
  if (!file) return null;
  const fileExt = file.name.split('.').pop();
  const filePath = `avatars/${userId}.${fileExt}`;

  // Upload file
  const { data, error } = await supabase.storage.from('avatars').upload(filePath, file, { upsert: true });
  if (error) {
    alert('Avatar upload failed: ' + error.message);
    return null;
  }
  return filePath;
}

// Save profile updates (avatar + display name)
async function saveProfile() {
  profileMessage.textContent = '';
  const newDisplayName = displayNameInput.value.trim();
  let avatarPath = userData.avatar_url;

  if (avatarInput.files.length > 0) {
    const uploadedPath = await uploadAvatar(avatarInput.files[0]);
    if (uploadedPath) avatarPath = uploadedPath;
  }

  const { error } = await supabase.from('users').upsert({
    id: userId,
    display_name: newDisplayName,
    avatar_url: avatarPath,
  });

  if (error) {
    profileMessage.textContent = 'Failed to save profile: ' + error.message;
    profileMessage.style.color = 'red';
  } else {
    profileMessage.textContent = 'Profile updated successfully!';
    profileMessage.style.color = 'green';

    // Update avatar preview
    if (avatarPath) {
      profileAvatar.src = supabase.storage.from('avatars').getPublicUrl(avatarPath).publicUrl;
    }

    // Clear file input
    avatarInput.value = '';
  }
}

// Fetch and render user posts
async function loadUserPosts() {
  const { data, error } = await supabase.from('posts')
    .select('id, text, image_url, inserted_at')
    .eq('user_id', userId)
    .order('inserted_at', { ascending: false });

  if (error) {
    console.error('Error loading posts:', error.message);
    postsContainer.textContent = 'Failed to load posts.';
    return;
  }

  postsContainer.innerHTML = '';
  if (data.length === 0) {
    postsContainer.textContent = 'No posts yet.';
    return;
  }

  data.forEach(post => {
    const postEl = document.createElement('article');
    postEl.className = 'post';
    postEl.innerHTML = `
      <p class="post-date">${new Date(post.inserted_at).toLocaleString()}</p>
      <p class="post-text">${post.text}</p>
      ${post.image_url ? `<img class="post-image" src="${supabase.storage.from('images').getPublicUrl(post.image_url).publicUrl}" alt="Post image" />` : ''}
    `;
    postsContainer.appendChild(postEl);
  });
}

// Logout
logoutBtn.addEventListener('click', async () => {
  await supabase.auth.signOut();
  window.location.href = 'login.html';
});

// Save profile button
saveProfileBtn.addEventListener('click', saveProfile);

// On page load
window.addEventListener('DOMContentLoaded', async () => {
  await loadProfile();
  await loadUserPosts();
});