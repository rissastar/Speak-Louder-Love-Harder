import { supabase } from './auth.js';

async function loadProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return location.href = 'index.html';

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    document.getElementById('status').textContent = 'Error loading profile.';
    return;
  }

  document.getElementById('username').value = data.username || '';
  document.getElementById('bio').value = data.bio || '';
}

async function updateProfile() {
  const username = document.getElementById('username').value.trim();
  const bio = document.getElementById('bio').value.trim();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return location.href = 'index.html';

  const { error } = await supabase
    .from('profiles')
    .update({ username, bio })
    .eq('id', user.id);

  const status = document.getElementById('status');
  if (error) {
    status.textContent = 'Update failed: ' + error.message;
  } else {
    status.textContent = 'Profile updated successfully!';
  }
}

loadProfile();
window.updateProfile = updateProfile;