import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://ytgrzhtntwzefwjmhgjj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3p...'; // full key from you

const supabase = createClient(supabaseUrl, supabaseKey);

// LOGIN
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert('Login failed: ' + error.message);
    } else {
      alert('Logged in!');
      window.location.href = 'feed.html';
    }
  });
}

// REGISTER
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = registerForm.email.value.trim();
    const password = registerForm.password.value;
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert('Registration failed: ' + error.message);
    } else {
      alert('Registered successfully! Please check your email to confirm.');
      window.location.href = 'login.html';
    }
  });
}