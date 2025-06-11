const supabase = supabase.createClient(
  'https://ytgrzhtntwzefwjmhgjj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8'
);

const usernameInput = document.getElementById('username');
const bioInput = document.getElementById('bio');
const passwordInput = document.getElementById('new-password');
const avatarInput = document.getElementById('avatar');

const strengthMeter = document.getElementById('strength-meter');
const strengthText = document.getElementById('strength-text');

// Load current user profile
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
  }
})();

// Handle profile updates
document.getElementById('settings-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const { data: { user } } = await supabase.auth.getUser();

  await supabase.from('profiles').update({
    username: usernameInput.value,
    bio: bioInput.value
  }).eq('id', user.id);

  if (passwordInput.value.length >= 6) {
    await supabase.auth.updateUser({ password: passwordInput.value });
  }

  alert('Profile updated!');
});

// Password strength meter
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

// Handle avatar upload
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
    alert('Upload failed');
  } else {
    await supabase
      .from('profiles')
      .update({ avatar_url: filePath })
      .eq('id', user.id);
    alert('Avatar uploaded!');
  }
});

// Handle account deletion
document.getElementById('delete-account').addEventListener('click', async () => {
  const password = prompt('Please enter your password to confirm deletion:');
  if (!password) return;

  const email = (await supabase.auth.getUser()).data.user.email;
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });

  if (signInError) {
    alert('Incorrect password');
    return;
  }

  const user = signInData.user;

  // Delete avatar
  const avatarPath = `avatars/${user.id}.jpg`;
  await supabase.storage.from('avatars').remove([avatarPath]);

  // Delete profile
  await supabase.from('profiles').delete().eq('id', user.id);

  // Delete user session
  await supabase.auth.signOut();

  alert('Your account has been deleted.');
  window.location.href = 'register.html';
});