import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://ytgrzhtntwzefwjmhgjj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8'
);

const avatarPreview = document.getElementById('avatar-preview');
const avatarInput = document.getElementById('avatar-input');
const uploadButton = document.getElementById('upload-avatar');
const usernameInput = document.getElementById('username');
const bioInput = document.getElementById('bio');
const passwordInput = document.getElementById('new-password');
const settingsForm = document.getElementById('settings-form');
const settingsMessage = document.getElementById('settings-message');

// Show/hide topic dropdown
document.getElementById('toggleTopics').addEventListener('click', () => {
  document.getElementById('topicDropdown').classList.toggle('hidden');
});

async function getUserData() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (data) {
    usernameInput.value = data.username || '';
    bioInput.value = data.bio || '';

    if (data.avatar_url) {
      const { data: imageUrl } = supabase.storage.from('avatars').getPublicUrl(data.avatar_url);
      avatarPreview.src = imageUrl.publicUrl;
    }
  }
}

uploadButton.addEventListener('click', async () => {
  const file = avatarInput.files[0];
  if (!file) return;

  const { data: { user } } = await supabase.auth.getUser();
  const fileName = `${user.id}-${Date.now()}.${file.name.split('.').pop()}`;

  const { error: uploadError } = await supabase
    .storage
    .from('avatars')
    .upload(fileName, file, { upsert: true });

  if (uploadError) {
    settingsMessage.textContent = 'Error uploading avatar.';
    return;
  }

  await supabase
    .from('profiles')
    .update({ avatar_url: fileName })
    .eq('id', user.id);

  const { data: imageUrl } = supabase.storage.from('avatars').getPublicUrl(fileName);
  avatarPreview.src = imageUrl.publicUrl;
  settingsMessage.textContent = 'Avatar updated!';
});

settingsForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const { data: { user } } = await supabase.auth.getUser();
  const updates = {
    username: usernameInput.value.trim(),
    bio: bioInput.value.trim()
  };

  await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id);

  if (passwordInput.value.trim().length > 5) {
    await supabase.auth.updateUser({
      password: passwordInput.value.trim()
    });
  }

  settingsMessage.textContent = 'Settings saved successfully!';
});

getUserData();

const strengthMeter = document.getElementById('strength-meter');
const strengthText = document.getElementById('strength-text');

passwordInput.addEventListener('input', () => {
  const value = passwordInput.value;
  let strength = 0;

  if (value.length > 5) strength++;
  if (value.length > 8) strength++;
  if (/[A-Z]/.test(value)) strength++;
  if (/[0-9]/.test(value)) strength++;
  if (/[\W]/.test(value)) strength++;

  const colors = ['red', 'orange', 'yellow', '#6d4aff', 'green'];
  const labels = ['Very Weak', 'Weak', 'Okay', 'Good', 'Strong'];

  strengthMeter.style.width = `${(strength / 5) * 100}%`;
  strengthMeter.style.backgroundColor = colors[strength - 1] || 'transparent';
  strengthText.textContent = labels[strength - 1] || '';
});

// profile.js
import { supabase } from './supabaseClient.js';
import { checkAuth } from './auth.js';
import { escapeHTML } from './utils.js';

export async function initProfilePage(publicView = false) {
  const session = await checkAuth(!publicView);
  if (!session && !publicView) return;

  const userId = publicView
    ? new URLSearchParams(location.search).get('user_id')
    : session.user.id;

  const { data: user } = await supabase
    .from('users')
    .select('username, email, avatar_url')
    .eq('id', userId)
    .single();

  if (!user) return;

  const avatarUrl = user.avatar_url
    ? supabase.storage.from('avatars').getPublicUrl(user.avatar_url).publicUrl
    : 'default-avatar.png';

  document.getElementById('profile-avatar').src = avatarUrl;
  document.getElementById('profile-username').textContent = user.username || user.email;
  document.getElementById('profile-email').textContent = user.email;

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', userId)
    .order('inserted_at', { ascending: false });

  const postsContainer = document.getElementById('user-posts');
  postsContainer.innerHTML = '';
  posts.forEach(post => {
    const image = post.image_url
      ? supabase.storage.from('images').getPublicUrl(post.image_url).publicUrl
      : null;
    postsContainer.innerHTML += `
      <div class="post">
        <small>${post.category} • ${post.type}</small>
        <p>${escapeHTML(post.text)}</p>
        ${image ? `<img src="${image}" class="post-image" />` : ''}
      </div>
    `;
  });
}