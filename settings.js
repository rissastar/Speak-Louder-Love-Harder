// Existing Supabase initialization...
const supabase = supabase.createClient(
  'https://ytgrzhtntwzefwjmhgjj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8'
);

const usernameInput = document.getElementById('username');
const bioInput = document.getElementById('bio');
const passwordInput = document.getElementById('new-password');
const avatarInput = document.getElementById('avatar');
const avatarPreview = document.getElementById('avatar-preview');
const currentAvatar = document.getElementById('current-avatar');

// Show toast message
function showToast(message, success = true) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.style.background = success ? '#6d4aff' : '#ff4d4d';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Load user data
(async () => {
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (data) {
    usernameInput.value = data.username || '';
    bioInput.value = data.bio || '';

    if (data.avatar_url) {
      const { data: avatar } = supabase.storage
        .from('avatars')
        .getPublicUrl(data.avatar_url);
      currentAvatar.src = avatar.publicUrl;
    }
  }
})();

// Image preview
avatarInput.addEventListener('change', () => {
  const file = avatarInput.files[0];
  if (file) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

// Update form
document.getElementById('settings-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const { data: { user } } = await supabase.auth.getUser();

  const { error } = await supabase.from('profiles').update({
    username: usernameInput.value,
    bio: bioInput.value
  }).eq('id', user.id);

  if (passwordInput.value.length >= 6) {
    await supabase.auth.updateUser({ password: passwordInput.value });
  }

  showToast('Profile updated!');
});

// Password strength
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

  const meter = document.getElementById('strength-meter');
  const text = document.getElementById('strength-text');

  meter.style.width = `${(strength / 5) * 100}%`;
  meter.style.backgroundColor = colors[strength - 1] || 'transparent';
  text.textContent = labels[strength - 1] || '';
});

// Upload avatar
document.getElementById('avatar-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const file = avatarInput.files[0];
  if (!file) return;

  const { data: { user } } = await supabase.auth.getUser();
  const filePath = `avatars/${user.id}.jpg`;

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    showToast('Upload failed!', false);
  } else {
    await supabase
      .from('profiles')
      .update({ avatar_url: filePath })
      .eq('id', user.id);

    const { data: avatar } = supabase.storage.from('avatars').getPublicUrl(filePath);
    currentAvatar.src = avatar.publicUrl;
    showToast('Avatar uploaded!');
  }
});

// Delete account
document.getElementById('delete-account').addEventListener('click', async () => {
  const password = prompt('Enter your password to confirm deletion:');
  if (!password) return;

  const email = (await supabase.auth.getUser()).data.user.email;
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });

  if (signInError) {
    showToast('Incorrect password', false);
    return;
  }

  const user = signInData.user;
  const avatarPath = `avatars/${user.id}.jpg`;

  await supabase.storage.from('avatars').remove([avatarPath]);
  await supabase.from('profiles').delete().eq('id', user.id);
  await supabase.auth.signOut();

  showToast('Account deleted');
  setTimeout(() => {
    window.location.href = 'register.html';
  }, 1500);
});