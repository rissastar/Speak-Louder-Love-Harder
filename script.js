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
  if (themeToggleBtn) {
    themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

function applyColorTheme(color) {
  root.setAttribute('data-color-theme', color);
  localStorage.setItem('colorTheme', color);
}

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const savedColorTheme = localStorage.getItem('colorTheme') || 'default';

  applyTheme(savedTheme);
  applyColorTheme(savedColorTheme);

  // Initialize quote rotator if quoteElement exists
  if (quoteElement) {
    quoteElement.textContent = quotes[0];
    quoteElement.style.opacity = 1;
  }
});

if (themeToggleBtn) {
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
  "Believe in your strength.",
  "Healing begins with hope.",
  "You are stronger than your struggles.",
  "Every day is a new beginning.",
  "Kindness is a powerful weapon."
];

const quoteElement = document.getElementById('quote') || document.getElementById('quote-box');
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
      typeText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 80);
    }
  }
  typeWriter();
}

// ===== SCROLL-TO-TOP BUTTON =====
const scrollBtn = document.getElementById('scrollTopBtn');
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
      scrollObserver.unobserve(entry.target); // Animate once only
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
cursor.style.position = 'fixed';
cursor.style.width = '15px';
cursor.style.height = '15px';
cursor.style.borderRadius = '50%';
cursor.style.backgroundColor = '#ff4081'; // pink-ish
cursor.style.pointerEvents = 'none';
cursor.style.zIndex = '10000';
cursor.style.transform = 'translate(-50%, -50%)';
cursor.style.transition = 'transform 0.1s ease-out';
document.body.appendChild(cursor);

window.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// ===== CONFETTI EFFECT =====
// Requires canvas-confetti script in HTML:
// <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>

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

// ===== PARTICLES.JS INITIALIZATION =====
// Assumes particles.js library loaded externally with <script src="..."></script>
particlesJS('particles-js', {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: '#FF6F61' }, // coral color
    shape: { type: 'circle' },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, bounce: false }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'grab' },
      onclick: { enable: true, mode: 'push' }
    },
    modes: {
      grab: { distance: 100, line_linked: { opacity: 0.5 } },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});