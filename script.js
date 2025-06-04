// Theme toggle with persistence
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark-mode');
    themeToggleBtn.textContent = '☀️';
  } else {
    body.classList.remove('dark-mode');
    themeToggleBtn.textContent = '🌙';
  }
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  if (body.classList.contains('dark-mode')) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
}

// Load saved theme or default to light or system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme);
} else {
  // Match system preference if no saved theme
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(prefersDark ? 'dark' : 'light');
}

themeToggleBtn.addEventListener('click', toggleTheme);

// Inspirational quotes rotator
const quotes = [
  "You are stronger than you think.",
  "Every step forward is progress.",
  "Healing is a journey, not a destination.",
  "Love yourself fiercely and unapologetically.",
  "Your story matters — speak louder, love harder.",
  "Together we rise, together we heal.",
  "Hope is the heartbeat of the soul.",
  "Kindness is a language the deaf can hear and the blind can see.",
  "The bravest thing you can do is keep going.",
  "Courage doesn't always roar; sometimes it's the quiet voice at the end of the day."
];

const quoteEl = document.getElementById('quote');
let currentQuoteIndex = 0;

function showQuote(index) {
  quoteEl.textContent = quotes[index];
}

function rotateQuotes() {
  currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
  showQuote(currentQuoteIndex);
}

// Initialize first quote
showQuote(currentQuoteIndex);
// Rotate every 6 seconds
setInterval(rotateQuotes, 6000);