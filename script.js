// script.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Your Supabase credentials (replace with your actual values)
const supabaseUrl = 'https://rbpjytmoqvwanqgbmhem.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJicGp5dG1vcXZ3YW5xZ2JtaGVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MDIyNDMsImV4cCI6MjA2NTE3ODI0M30.xEjcJfZA4iIs7R27KsX6SEiZiU2yD6R3AjHFpfhFnDQ';

const supabase = createClient(supabaseUrl, supabaseKey);

// LOGIN FORM HANDLER
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      document.getElementById('login-error').textContent = error.message;
    } else {
      // Redirect after successful login
      window.location.href = 'feed.html'; // or your desired page
    }
  });
}

// REGISTER FORM HANDLER
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      document.getElementById('register-error').textContent = error.message;
    } else {
      alert('Registration successful! Please check your email to confirm your account.');
      window.location.href = 'login.html';
    }
  });
}