const quotes = [
  "“You are stronger than you think.”",
  "“Healing isn’t linear, and that’s okay.”",
  "“You matter. You are not alone.”",
  "“Speak your truth, even if your voice shakes.”",
  "“Love louder than hate.”"
];

let i = 0;
const quoteElement = document.getElementById('quote');

setInterval(() => {
  i = (i + 1) % quotes.length;
  quoteElement.textContent = quotes[i];
}, 5000);

// Theme Toggle
const toggleBtn = document.getElementById('theme-toggle');
const theme = localStorage.getItem('theme');

if (theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

toggleBtn.onclick = () => {
  const current = document.documentElement.getAttribute('data-theme');
  const newTheme = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
};

// Registration
const regForm = document.getElementById('registerForm');
if (regForm) {
  regForm.onsubmit = function(e) {
    e.preventDefault();
    const user = document.getElementById('registerUsername').value;
    const pass = document.getElementById('registerPassword').value;
    if (localStorage.getItem(`user_${user}`)) {
      document.getElementById('registerMsg').textContent = 'Username already exists.';
    } else {
      localStorage.setItem(`user_${user}`, pass);
      localStorage.setItem('currentUser', user);
      location.href = 'profile.html';
    }
  };
}

// Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.onsubmit = function(e) {
    e.preventDefault();
    const user = document.getElementById('loginUsername').value;
    const pass = document.getElementById('loginPassword').value;
    const storedPass = localStorage.getItem(`user_${user}`);
    if (storedPass && storedPass === pass) {
      localStorage.setItem('currentUser', user);
      location.href = 'profile.html';
    } else {
      document.getElementById('loginMsg').textContent = 'Invalid username or password.';
    }
  };
}

// Profile Greeting
const profilePage = document.body.contains(document.querySelector('#profileUsername'));
if (profilePage) {
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    document.getElementById('profileUsername').textContent = currentUser;
  } else {
    location.href = 'login.html';
  }
}