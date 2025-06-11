import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://ytgrzhtntwzefwjmhgjj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8'
);

// 🔁 Auto-redirect if already logged in
supabase.auth.getSession().then(({ data: { session } }) => {
  if (session) {
    const path = window.location.pathname;
    if (path.includes('login') || path.includes('register') || path === '/' || path.includes('index')) {
      window.location.href = 'profile.html';
    }
  }
});

// 🔐 LOGIN FORM
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email');
    const password = document.getElementById('password');
    clearErrors([email, password]);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.value.trim(),
      password: password.value.trim()
    });

    if (error) {
      handleError(email, password, error.message);
    } else {
      window.location.href = 'profile.html';
    }
  });
}

// 📝 REGISTER FORM
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email');
    const password = document.getElementById('password');
    clearErrors([email, password]);

    if (!isStrongPassword(password.value)) {
      handleError(password, null, 'Password must be at least 8 characters and include a number.');
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: email.value.trim(),
      password: password.value.trim()
    });

    if (error) {
      handleError(email, password, error.message);
    } else {
      window.location.href = 'settings.html';
    }
  });
}

// 🚪 LOGOUT HANDLER
const logoutButton = document.getElementById('logout-btn');
if (logoutButton) {
  logoutButton.addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.href = 'logout.html';
  });
}

// 🧠 HELPERS
function handleError(el1, el2 = null, message) {
  if (el1) el1.classList.add('error');
  if (el2) el2.classList.add('error');
  showMessage(message);
}

function clearErrors(fields) {
  fields.forEach((field) => field.classList.remove('error'));
  showMessage('');
}

function showMessage(msg) {
  let el = document.getElementById('error-message');
  if (!el) {
    el = document.createElement('div');
    el.id = 'error-message';
    el.style.color = 'red';
    el.style.fontSize = '0.9em';
    el.style.marginTop = '0.5rem';
    document.body.appendChild(el);
  }
  el.textContent = msg;
}

function isStrongPassword(password) {
  return password.length >= 8 && /\d/.test(password);
}