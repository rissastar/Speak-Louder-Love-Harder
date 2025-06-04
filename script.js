// ===== Theme & Color Management =====
const themeToggleBtn = document.getElementById('theme-toggle');
const rootElement = document.documentElement;
const bodyElement = document.body;

// Available color themes
const colorThemes = ['default', 'green', 'blue', 'red', 'pink'];

// Load saved theme from localStorage or system preference
function loadTheme() {
  const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const savedColor = localStorage.getItem('colorTheme') || 'default';

  if (savedTheme === 'dark') {
    rootElement.setAttribute('data-theme', 'dark');
  } else {
    rootElement.removeAttribute('data-theme');
  }

  setColorTheme(savedColor);
  updateThemeToggleIcon(savedTheme);
}

// Save theme preference
function saveTheme(theme) {
  localStorage.setItem('theme', theme);
}

// Save color theme preference
function saveColorTheme(color) {
  localStorage.setItem('colorTheme', color);
}

// Toggle dark/light theme
function toggleTheme() {
  const isDark = rootElement.getAttribute('data-theme') === 'dark';

  if (isDark) {
    rootElement.removeAttribute('data-theme');
    saveTheme('light');
    updateThemeToggleIcon('light');
  } else {
    rootElement.setAttribute('data-theme', 'dark');
    saveTheme('dark');
    updateThemeToggleIcon('dark');
  }
}

// Update toggle button icon (sun/moon)
function updateThemeToggleIcon(theme) {
  if (!themeToggleBtn) return;
  if (theme === 'dark') {
    themeToggleBtn.innerHTML = '☀️';  // Sun icon for light mode toggle
  } else {
    themeToggleBtn.innerHTML = '🌙';  // Moon icon for dark mode toggle
  }
}

// Set color theme class on body
function setColorTheme(color) {
  colorThemes.forEach(c => {
    if (c === 'default') {
      bodyElement.classList.remove('theme-green', 'theme-blue', 'theme-red', 'theme-pink');
    } else {
      bodyElement.classList.remove(`theme-${c}`);
    }
  });

  if (color !== 'default') {
    bodyElement.classList.add(`theme-${color}`);
  }
  saveColorTheme(color);
}

// ===== Scroll to Top Button =====
const scrollBtn = document.getElementById('scrollToTopBtn');

function handleScroll() {
  if (window.scrollY > 300) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== Custom Cursor =====
const customCursor = document.getElementById('custom-cursor');

function moveCursor(e) {
  if (!customCursor) return;
  customCursor.style.left = `${e.clientX}px`;
  customCursor.style.top = `${e.clientY}px`;
}

// ===== Quote Rotator =====
const quotes = [
  "“Healing takes time, and asking for help is a courageous step.”",
  "“Every small act of love makes the world brighter.”",
  "“Strength grows in the moments when you think you can’t go on but you keep going anyway.”",
  "“Your story matters and your voice deserves to be heard.”",
  "“Together, we can break the chains of stigma and fear.”"
];

const quoteElement = document.querySelector('.quote-rotator');
let quoteIndex = 0;

function rotateQuotes() {
  if (!quoteElement) return;
  quoteIndex = (quoteIndex + 1) % quotes.length;
  quoteElement.textContent = quotes[quoteIndex];
}

// ===== Daily Affirmations =====
const affirmations = [
  "You are stronger than you know.",
  "Today is a new beginning.",
  "Your feelings are valid.",
  "You are worthy of love and kindness.",
  "Every step forward is progress."
];
const affirmationBtn = document.querySelector('.daily-affirmation button');
const affirmationDisplay = document.querySelector('.daily-affirmation');

function showRandomAffirmation() {
  if (!affirmationDisplay) return;
  const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
  affirmationDisplay.querySelector('p').textContent = randomAffirmation;
}

// ===== Initialization =====
function init() {
  loadTheme();

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  if (scrollBtn) {
    window.addEventListener('scroll', handleScroll);
    scrollBtn.addEventListener('click', scrollToTop);
  }

  if (customCursor) {
    window.addEventListener('mousemove', moveCursor);
  }

  if (quoteElement) {
    setInterval(rotateQuotes, 6000);
  }

  if (affirmationBtn) {
    affirmationBtn.addEventListener('click', showRandomAffirmation);
  }
}

// Run the initialization on DOMContentLoaded
document.addEventListener('DOMContentLoaded', init);