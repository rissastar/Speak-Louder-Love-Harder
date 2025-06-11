// js/settings.js

const supabase = supabase.createClient(
  'https://zgjfbbfnldxlvzstnfzy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnamZiYmZubGR4bHZ6c3RuZnp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NDczNzIsImV4cCI6MjA2NTIyMzM3Mn0.-Lt8UIAqI5ySoyyTGzRs3JVBhdcZc8zKxiLH6qbu3dU'
);

const avatarPreview = document.getElementById('avatar-preview');
const avatarUpload = document.getElementById('avatar-upload');
const usernameInput = document.getElementById('username');
const bioInput = document.getElementById('bio');
const settingsForm = document.getElementById('settings-form');

let avatarUrl = null;

// Load current user profile info
async function loadProfile() {
  const user = supabase.auth.getUser();
  const session = await supabase.auth.getSession();

  if (!session.data.session) {
    // Not logged in, redirect to login page
    window.location.href = 'login.html';
    return;
  }

  const userId = session.data.session.user.id;

  // Fetch profile data from 'profiles' table
  let { data, error } = await supabase
    .from('profiles')
    .select('username, bio, avatar_url')
    .eq('id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    alert('Error loading profile: ' + error.message);
  } else if (data) {
    usernameInput.value = data.username || '';
    bioInput.value = data.bio || '';
    avatarUrl = data.avatar_url || null;
    if (avatarUrl) {
      avatarPreview.src = avatarUrl;
    }
  }
}

// Upload avatar image and return public URL
async function uploadAvatar(file) {
  try {
    const session = await supabase.auth.getSession();
    const userId = session.data.session.user.id;
    const fileExt = file.name.split('.').pop();
    const filePath = `${userId}/avatar.${fileExt}`;

    // Upload to storage bucket "avatars"
    let { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
    return data.publicUrl;
  } catch (error) {
    alert('Avatar upload failed: ' + error.message);
    return null;
  }
}

// Handle avatar file selection
avatarUpload.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Show preview immediately
  avatarPreview.src = URL.createObjectURL(file);

  // Upload file and get URL
  const publicUrl = await uploadAvatar(file);
  if (publicUrl) avatarUrl = publicUrl;
});

// Handle form submission
settingsForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const session = await supabase.auth.getSession();
  const userId = session.data.session.user.id;

  const updates = {
    id: userId,
    username: usernameInput.value,
    bio: bioInput.value,
    avatar_url: avatarUrl,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from('profiles').upsert(updates);

  if (error) {
    alert('Failed to update profile: ' + error.message);
  } else {
    alert('Profile updated successfully!');
    // Optionally reload or redirect
  }
});

// Initialize page by loading profile info
loadProfile();