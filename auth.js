// js/auth.js
const supabase = supabase.createClient(
  'https://zgjfbbfnldxlvzstnfzy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnamZiYmZubGR4bHZ6c3RuZnp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NDczNzIsImV4cCI6MjA2NTIyMzM3Mn0.-Lt8UIAqI5ySoyyTGzRs3JVBhdcZc8zKxiLH6qbu3dU'
);

// LOGIN
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    alert('Login failed: ' + error.message);
  } else {
    window.location.href = 'feed.html';
  }
});

// REGISTER
document.getElementById('register-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username },
    },
  });

  if (error) {
    alert('Signup failed: ' + error.message);
  } else {
    window.location.href = 'settings.html';
  }
});