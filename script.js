// ===== Helper: Save/Load to localStorage =====
const storageKeyTheme = 'sllh-theme';
const storageKeyColorTheme = 'sllh-color-theme';

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // localStorage unavailable
  }
}

function loadFromStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

// ===== Theme & Color Theme =====
const htmlEl = document.documentElement;
const themeToggleBtn = document.getElementById('theme-toggle');
const colorThemeSelector = document.getElementById('color-theme-selector');

function applyTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  saveToStorage(storageKeyTheme, theme);
}

function applyColorTheme(color) {
  htmlEl.setAttribute('data-color-theme', color);
  saveToStorage(storageKeyColorTheme, color);
}

function toggleTheme() {
  const currentTheme = htmlEl.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
}

themeToggleBtn.addEventListener('click', toggleTheme);

colorThemeSelector.addEventListener('change', e => {
  applyColorTheme(e.target.value);
});

// Load saved preferences on startup
const savedTheme = loadFromStorage(storageKeyTheme) || 'light';
const savedColorTheme = loadFromStorage(storageKeyColorTheme) || 'default';

applyTheme(savedTheme);
applyColorTheme(savedColorTheme);
colorThemeSelector.value = savedColorTheme;

// ===== Scroll to Top Button =====
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Custom Cursor =====
const customCursor = document.getElementById('custom-cursor');

window.addEventListener('mousemove', e => {
  customCursor.style.top = e.clientY + 'px';
  customCursor.style.left = e.clientX + 'px';
});

// Scale cursor on hovering links
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('mouseenter', () => {
    customCursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    customCursor.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--primary');
  });
  link.addEventListener('mouseleave', () => {
    customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
    customCursor.style.backgroundColor = 'transparent';
  });
});

// ===== Quote Rotator =====
const quotes = [
  "Healing begins when we choose to speak up.",
  "Your voice matters more than you know.",
  "Every story shared is a step toward justice.",
  "Hope is a light we carry together.",
  "Love harder, speak louder, shine brighter.",
  "Strength grows through sharing your truth.",
  "Together we heal, together we rise."
];

const quoteRotatorEl = document.getElementById('quote-rotator');
let currentQuoteIndex = 0;

function rotateQuote() {
  currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
  quoteRotatorEl.textContent = quotes[currentQuoteIndex];
}

setInterval(rotateQuote, 8000);

// ===== Daily Affirmation =====
const affirmations = [
  "I am worthy of love and kindness.",
  "My story matters and inspires others.",
  "I choose healing and growth every day.",
  "I am stronger than my struggles.",
  "Hope guides me forward.",
  "I deserve peace and happiness.",
  "Every day is a new beginning."
];

const affirmationBox = document.getElementById('affirmation-box');
const newAffirmBtn = document.getElementById('new-affirmation');

function showNewAffirmation() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * affirmations.length);
  } while (affirmations[newIndex] === affirmationBox.textContent);

  affirmationBox.textContent = affirmations[newIndex];
}

newAffirmBtn.addEventListener('click', showNewAffirmation);

// ===== Scroll-triggered Animation =====
const scrollAnimateEls = document.querySelectorAll('[data-scroll-animate]');

function onScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  scrollAnimateEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', onScroll);
window.addEventListener('load', onScroll);