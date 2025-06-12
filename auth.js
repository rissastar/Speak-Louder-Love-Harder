// auth.js
import { supabase } from './supabaseClient.js';

export async function logout() {
  await supabase.auth.signOut();
  window.location.href = 'login.html';
}

export async function checkAuth(redirect = true) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session && redirect) window.location.href = 'login.html';
  return session;
}

export async function initAuthPage() {
  const form = document.getElementById('auth-form');
  const isRegister = window.location.pathname.includes('register');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    const password = form.password.value;
    const fn = isRegister ? supabase.auth.signUp : supabase.auth.signInWithPassword;

    const { error } = await fn({ email, password });
    const message = document.getElementById('message');

    if (error) {
      message.textContent = error.message;
      message.style.color = 'red';
    } else {
      message.textContent = isRegister
        ? 'Check your email to confirm.'
        : 'Logged in!';
      message.style.color = 'green';
      setTimeout(() => location.href = 'feed.html', 1000);
    }
  });
}