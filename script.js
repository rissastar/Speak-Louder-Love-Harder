// ===== Theme & Color Management =====
const root = document.documentElement;
const bodyElement = document.body;
const themeToggleBtn = document.getElementById('theme-toggle');
const scrollTopBtn = document.getElementById('scroll-to-top');
const customCursor = document.getElementById('custom-cursor');

// Color themes available
const colorThemes = ['default', 'green', 'blue', 'red', 'pink'];

// Set theme (light/dark) and update toggle icon
function setTheme(theme) {
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    themeToggleBtn.innerHTML = '☀️';
    themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
  } else {
    root.removeAttribute('data-theme');
    themeToggleBtn.innerHTML = '🌙';
    themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
  }
  localStorage.setItem('theme', theme);
}

// Set color theme class
function setColorTheme(color) {
  colorThemes.forEach(c => bodyElement.classList.remove(`theme-${c}`));
  if (color !== 'default') bodyElement.classList.add(`theme-${color}`);
  localStorage.setItem('colorTheme', color);
}

// Load saved theme settings
function loadThemeSettings() {
  const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const savedColor = localStorage.getItem('colorTheme') || 'default';
  setTheme(savedTheme);
  setColorTheme(savedColor);
}

// ===== Scroll to Top Button =====
function handleScroll() {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== Custom Cursor =====
function moveCursor(e) {
  if (!customCursor) return;
  customCursor.style.left = `${e.clientX}px`;
  customCursor.style.top = `${e.clientY}px`;
}

// ===== Quote Rotator =====
const quotes = [
  "“Healing takes time, and asking for help is a courageous step.” — Mariska Hargitay",
  "“There is no greater agony than bearing an untold story inside you.” — Maya Angelou",
  "“Vulnerability is not winning or losing; it’s having the courage to show up.” — Brené Brown",
  "“Every child you encounter is a divine appointment.” — Wess Stafford",
  "“Pit bulls are just dogs. Treat them as individuals.” — BadRap.org",
  "“Stars can’t shine without darkness.” — D.H. Sidebottom"
];
let quoteIndex = 0;
function rotateQuotes() {
  const quoteElement = document.querySelector('.quote-rotator');
  if (!quoteElement) return;
  quoteIndex = (quoteIndex + 1) % quotes.length;
  quoteElement.textContent = quotes[quoteIndex];
}

// ===== Daily Affirmation =====
const affirmations = [
  "You are enough exactly as you are.",
  "Every day is a fresh start.",
  "You have the power to change your story.",
  "You are not alone in your struggles.",
  "Kindness begins with you.",
  "You are doing your best, and that’s enough.",
  "You are stronger than you know.",
  "Today is a new beginning.",
  "Your feelings are valid.",
  "You are worthy of love and kindness.",
  "Every step forward is progress."
];
function showRandomAffirmation() {
  const display = document.querySelector('.daily-affirmation');
  if (!display) return;
  const p = display.querySelector('p');
  const random = affirmations[Math.floor(Math.random() * affirmations.length)];
  if (p) {
    p.textContent = random;
  } else {
    const newP = document.createElement('p');
    newP.textContent = random;
    display.insertBefore(newP, display.firstChild);
  }
}

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', () => {
  loadThemeSettings();

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(current);
    });
  }

  if (scrollTopBtn) {
    window.addEventListener('scroll', handleScroll);
    scrollTopBtn.addEventListener('click', scrollToTop);
  }

  if (customCursor) {
    window.addEventListener('mousemove', moveCursor);
  }

  setInterval(rotateQuotes, 6000);

  const affirmationBtn = document.querySelector('.daily-affirmation button');
  if (affirmationBtn) {
    affirmationBtn.addEventListener('click', showRandomAffirmation);
  }
});