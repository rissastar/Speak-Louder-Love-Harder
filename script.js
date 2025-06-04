// Theme Toggle: Switch between light and dark modes
const themeToggleBtn = document.querySelector('.theme-toggle-btn');
const body = document.body;

function applySavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
  }
}

themeToggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  const newTheme = body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', newTheme);
});

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', applySavedTheme);

// Inspirational Quote Rotator
const quotes = [
  "Speak louder. Love harder. Heal deeper. 💚",
  "You are not alone. 💜",
  "Every scar tells a story of survival. 🌟",
  "Healing begins with being heard. 💖",
  "Hope is stronger than fear. ✨",
  "Your voice matters. Your story matters. 🦋",
  "Advocate with passion. Support with love. 🫶"
];

let quoteIndex = 0;
const quoteEl = document.getElementById('quote-rotator');

function rotateQuote() {
  if (quoteEl) {
    quoteEl.style.opacity = 0;

    setTimeout(() => {
      quoteIndex = (quoteIndex + 1) % quotes.length;
      quoteEl.textContent = quotes[quoteIndex];
      quoteEl.style.opacity = 1;
    }, 500);
  }
}

// Start rotating quotes every 5 seconds
setInterval(rotateQuote, 5000);