import { supabase } from './auth.js';

async function loadProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return location.href = 'index.html';

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (data?.avatar_url) {
    document.getElementById('preview').src = data.avatar_url;
  }
  document.getElementById('username').value = data?.username || '';
  document.getElementById('bio').value = data?.bio || '';
}

async function updateProfile() {
  const username = document.getElementById('username').value.trim();
  const bio = document.getElementById('bio').value.trim();
  const avatarFile = document.getElementById('avatar').files[0];

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  let avatar_url = null;
  if (avatarFile) {
    const ext = avatarFile.name.split('.').pop();
    const filePath = `${user.id}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, avatarFile, { upsert: true });

    if (!uploadError) {
      avatar_url = `https://rbpjytmoqvwanqgbmhem.supabase.co/storage/v1/object/public/avatars/${filePath}`;
      document.getElementById('preview').src = avatar_url;
    }
  }

  const update = { username, bio };
  if (avatar_url) update.avatar_url = avatar_url;

  const { error } = await supabase
    .from('profiles')
    .update(update)
    .eq('id', user.id);

  document.getElementById('status').textContent = error
    ? 'Update failed'
    : 'Profile updated!';
}

loadProfile();
window.updateProfile = updateProfile;