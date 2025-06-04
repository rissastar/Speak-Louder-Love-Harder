// Dark/Light mode toggle + preference saving
const themeToggleBtn = document.getElementById('theme-toggle');
const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggleBtn.textContent = '☀️';
  } else {
    document.documentElement.removeAttribute('data-theme');
    themeToggleBtn.textContent = '🌙';
  }
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  if (document.documentElement.getAttribute('data-theme') === 'dark') {
    setTheme('light');
  } else {
    setTheme('dark');
  }
}

// Initialize theme on page load
(function () {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme(userPrefersDark ? 'dark' : 'light');
  }
})();

themeToggleBtn.addEventListener('click', () => {
  toggleTheme();
});

// Quote rotator with fade effect
const quotes = [
  { text: "The only way out is through.", author: "Robert Frost" },
  { text: "You are stronger than you think.", author: "Unknown" },
  { text: "Hope is the thing with feathers that perches in the soul.", author: "Emily Dickinson" },
  { text: "Healing takes courage, and we all have courage, even if we have to dig a little to find it.", author: "Tori Amos" },
  { text: "Every day may not be good, but there is something good in every day.", author: "Alice Morse Earle" },
  { text: "Your story isn't over yet.", author: "Unknown" },
];

const quoteTextEl = document.getElementById('quote-text');
const quoteAuthorEl = document.getElementById('quote-author');

let currentQuoteIndex = 0;

function showQuote(index) {
  const { text, author } = quotes[index];
  quoteTextEl.style.opacity = 0;
  quoteAuthorEl.style.opacity = 0;
  setTimeout(() => {
    quoteTextEl.textContent = `"${text}"`;
    quoteAuthorEl.textContent = `— ${author}`;
    quoteTextEl.style.opacity = 1;
    quoteAuthorEl.style.opacity = 1;
  }, 600);
}

function nextQuote() {
  currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
  showQuote(currentQuoteIndex);
}

// Initialize first quote
showQuote(currentQuoteIndex);
setInterval(nextQuote, 8000);

// Scroll to top button
const scrollTopBtn = document.getElementById('scroll-top-btn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Daily Affirmation Generator
const affirmations = [
  "You are worthy of love and respect.",
  "Every step forward is progress.",
  "Believe in your infinite potential.",
  "You have the power to change your story.",
  "Your feelings are valid and important.",
  "Strength grows in the moments you think you can't go on but you keep going anyway.",
];

const dailyAffirmationEl = document.getElementById('daily-affirmation');
const newAffirmationBtn = document.getElementById('new-affirmation-btn');

function newAffirmation() {
  const randomIndex = Math.floor(Math.random() * affirmations.length);
  dailyAffirmationEl.textContent = `"${affirmations[randomIndex]}"`;
}

newAffirmationBtn.addEventListener('click', newAffirmation);

// Custom cursor glow trail (basic implementation)
const cursor = document.createElement('div');
cursor.id = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// CSS for cursor is in style.css below: