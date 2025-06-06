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

// Profile Load
document.addEventListener("DOMContentLoaded", function () {
  const user = localStorage.getItem("currentUser");
  if (!user) {
    location.href = "login.html";
    return;
  }

  const usernameEl = document.getElementById("profileUsername");
  if (usernameEl) usernameEl.textContent = user;

  // Load avatar
  const avatar = localStorage.getItem(`avatar_${user}`);
  if (avatar) document.getElementById("avatarPreview").src = avatar;

  // Load saved bio & quote
  document.getElementById("savedBio").textContent = localStorage.getItem(`bio_${user}`) || "";
  document.getElementById("savedQuote").textContent = localStorage.getItem(`quote_${user}`) || "";

  // Show admin panel
  if (user === "rissastar") {
    document.getElementById("adminTools").style.display = "block";
  }
});

// Save profile
function saveProfile() {
  const user = localStorage.getItem("currentUser");
  if (!user) return;

  const file = document.getElementById("avatarUpload").files[0];
  const urlInput = document.getElementById("avatarURL").value;
  const bio = document.getElementById("bio").value;
  const quote = document.getElementById("favQuote").value;

  if (bio) localStorage.setItem(`bio_${user}`, bio);
  if (quote) localStorage.setItem(`quote_${user}`, quote);

  if (urlInput) {
    localStorage.setItem(`avatar_${user}`, urlInput);
    document.getElementById("avatarPreview").src = urlInput;
  } else if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      localStorage.setItem(`avatar_${user}`, e.target.result);
      document.getElementById("avatarPreview").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  alert("Profile saved!");
}