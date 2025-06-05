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

// ===== THEME TOGGLE & COLOR THEME SWITCHER =====
const root = document.documentElement;
const themeToggleBtn = document.getElementById('theme-toggle');
const colorThemeButtons = document.querySelectorAll('.color-theme-btn');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function applyColorTheme(color) {
  root.setAttribute('data-color-theme', color);
  localStorage.setItem('colorTheme', color);
}

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  const savedColorTheme = localStorage.getItem('colorTheme') || 'default';
  applyTheme(savedTheme);
  applyColorTheme(savedColorTheme);

  // Initialize quote rotator text and opacity
  if (quoteElement) {
    quoteElement.textContent = quotes[currentQuote];
    quoteElement.style.opacity = 1;
  }
});

if (themeToggleBtn) {
  themeToggleBtn.checked = root.getAttribute('data-theme') === 'dark';
  themeToggleBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'light';
    applyTheme(current === 'light' ? 'dark' : 'light');
  });
}

colorThemeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const color = btn.getAttribute('data-color') || 'default';
    applyColorTheme(color);
  });
});

// ===== QUOTE ROTATOR =====
const quotes = [
  "You are stronger than your darkest days 💪",
  "Love heals, love wins 💖",
  "Every storm runs out of rain ⛈️",
  "Speak louder when the world whispers 🗣️",
  "Your voice matters, your heart matters ❤️",
  "Speak louder, love harder.",
  "You are enough.",
  "Keep going, you’ve got this!",
  "Believe in your strength."
];

const quoteElement = document.getElementById('quote-box');
let currentQuote = 0;

function showNextQuote() {
  if (!quoteElement) return;

  quoteElement.style.opacity = 0;
  setTimeout(() => {
    quoteElement.textContent = quotes[currentQuote];
    quoteElement.style.opacity = 1;
    currentQuote = (currentQuote + 1) % quotes.length;
  }, 500);
}

setInterval(showNextQuote, 6000);

// ===== TYPEWRITER EFFECT =====
const typeText = document.querySelector('.typewriter-text');
if (typeText) {
  const text = typeText.dataset.text || typeText.textContent;
  typeText.textContent = '';
  let i = 0;
  function typeWriter() {
    if (i < text.length) {
      typeText.textContent += text.charAt(i++);
      setTimeout(typeWriter, 80);
    }
  }
  typeWriter();
}

// ===== SCROLL-TO-TOP BUTTON =====
const scrollBtn = document.getElementById('scrollToTopBtn');
if (scrollBtn) {
  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== ANIMATED ELEMENTS ON SCROLL =====
const animatedEls = document.querySelectorAll('.animate-on-scroll');
const scrollObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      scrollObserver.unobserve(entry.target); // animate once only
    }
  });
}, { threshold: 0.2 });

animatedEls.forEach(el => scrollObserver.observe(el));

// ===== AUTH VISIBILITY CONTROLS =====
const profileLink = document.getElementById('profile-link');
const loginLink = document.getElementById('login-link');
const logoutBtn = document.getElementById('logout-btn');

onAuthStateChanged(auth, user => {
  if (user) {
    profileLink?.classList.remove('hidden');
    logoutBtn?.classList.remove('hidden');
    loginLink?.classList.add('hidden');
  } else {
    profileLink?.classList.add('hidden');
    logoutBtn?.classList.add('hidden');
    loginLink?.classList.remove('hidden');
  }
});

logoutBtn?.addEventListener('click', () => {
  auth.signOut();
});

// ===== CUSTOM CURSOR =====
const cursor = document.createElement('div');
Object.assign(cursor.style, {
  position: 'fixed',
  width: '15px',
  height: '15px',
  borderRadius: '50%',
  backgroundColor: '#ff4081',
  pointerEvents: 'none',
  zIndex: '10000',
  transform: 'translate(-50%, -50%)',
  transition: 'transform 0.1s ease-out'
});
document.body.appendChild(cursor);

window.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// ===== CONFETTI EFFECT =====
// Requires canvas-confetti script in HTML

function launchConfetti() {
  const duration = 3000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: Math.random(), y: Math.random() - 0.2 }
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: Math.random(), y: Math.random() - 0.2 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

const confettiBtn = document.getElementById('confetti-btn');
confettiBtn?.addEventListener('click', launchConfetti);