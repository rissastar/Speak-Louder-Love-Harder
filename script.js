// ===== Firebase Setup =====
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js';

const firebaseConfig = {
  apiKey: "AIzaSyCzmBdZJrtHEoxcAHte2B8iMrea-ctSxy8",
  authDomain: "speak-louder-581d7.firebaseapp.com",
  projectId: "speak-louder-581d7",
  storageBucket: "speak-louder-581d7.appspot.com",
  messagingSenderId: "674769404942",
  appId: "1:674769404942:web:1cbda7d50ff15208dce85f",
  measurementId: "G-54XJLK1CGJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// ===== Theme Toggle =====
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';
document.body.classList.add(currentTheme);

if (themeToggle) {
  themeToggle.checked = currentTheme === 'dark';

  themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? 'dark' : 'light';
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

// ===== Color Theme Switcher =====
const colorButtons = document.querySelectorAll('.color-theme-btn');
const savedColor = localStorage.getItem('color-theme');
if (savedColor) {
  document.body.classList.add(savedColor);
}

colorButtons.forEach(button => {
  button.addEventListener('click', () => {
    const color = button.dataset.color;
    document.body.classList.remove('theme-pink', 'theme-green', 'theme-purple');
    document.body.classList.add(`theme-${color}`);
    localStorage.setItem('color-theme', `theme-${color}`);
  });
});

// ===== Auto-Rotating Inspirational Quotes =====
const quoteBox = document.getElementById('quote-box');
const quotes = [
  "You are stronger than your darkest days 💪",
  "Love heals, love wins 💖",
  "Every storm runs out of rain ⛈️",
  "Speak louder when the world whispers 🗣️",
  "Your voice matters, your heart matters ❤️"
];
let currentQuote = 0;
function showQuote() {
  if (quoteBox) {
    quoteBox.textContent = quotes[currentQuote];
    currentQuote = (currentQuote + 1) % quotes.length;
  }
}
setInterval(showQuote, 6000);
showQuote();

// ===== Typewriter Effect =====
const typeText = document.querySelector('.typewriter-text');
if (typeText) {
  const text = typeText.dataset.text;
  let i = 0;
  function typeWriter() {
    if (i < text.length) {
      typeText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 80);
    }
  }
  typeWriter();
}

// ===== Scroll-to-Top Button =====
const scrollBtn = document.getElementById('scrollTopBtn');
if (scrollBtn) {
  window.onscroll = () => {
    scrollBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
  };

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== Animated Elements on Scroll =====
const observers = document.querySelectorAll('.animate-on-scroll');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
}, {
  threshold: 0.2
});
observers.forEach(el => observer.observe(el));

// ===== Auth Visibility Controls =====
const profileLink = document.getElementById('profile-link');
const loginLink = document.getElementById('login-link');
const logoutBtn = document.getElementById('logout-btn');

onAuthStateChanged(auth, (user) => {
  if (user) {
    profileLink.classList.remove('hidden');
    logoutBtn.classList.remove('hidden');
    loginLink.classList.add('hidden');
  } else {
    profileLink.classList.add('hidden');
    logoutBtn.classList.add('hidden');
    loginLink.classList.remove('hidden');
  }
});

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    auth.signOut();
  });
}