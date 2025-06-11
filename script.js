// auth.js
const supabaseUrl = 'https://ytgrzhtntwzefwjmhgjj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8';

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Check user status on page load
document.addEventListener('DOMContentLoaded', async () => {
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('user-info').style.display = 'block';
    document.getElementById('user-email').textContent = user.email;
  } else {
    document.getElementById('auth-container').style.display = 'block';
    document.getElementById('user-info').style.display = 'none';
  }
});

// Login
document.getElementById('login-submit').addEventListener('click', async () => {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    alert(error.message);
  } else {
    location.reload();
  }
});

// Register
document.getElementById('register-submit').addEventListener('click', async () => {
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    alert(error.message);
  } else {
    alert('Check your email for confirmation!');
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
  }
});

// Toggle forms
document.getElementById('show-register').addEventListener('click', () => {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('register-form').style.display = 'block';
  document.getElementById('show-login').style.display = 'inline';
  document.getElementById('show-register').style.display = 'none';
});

document.getElementById('show-login').addEventListener('click', () => {
  document.getElementById('login-form').style.display = 'block';
  document.getElementById('register-form').style.display = 'none';
  document.getElementById('show-login').style.display = 'none';
  document.getElementById('show-register').style.display = 'inline';
});

// Logout
document.getElementById('logout-btn').addEventListener('click', async () => {
  await supabase.auth.signOut();
  location.reload();
});