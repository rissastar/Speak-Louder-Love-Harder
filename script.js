// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  let theme = 'light';
  if (document.body.classList.contains('dark-mode')) {
    theme = 'dark';
  }
  localStorage.setItem('theme', theme);
});

// Auto-Rotating Inspirational Quotes
const quotes = [
  "The best way out is always through. – Robert Frost",
  "What lies behind us and what lies before us are tiny matters compared to what lies within us. – Ralph Waldo Emerson",
  "Turn your wounds into wisdom. – Oprah Winfrey",
  "Out of difficulties grow miracles. – Jean de La Bruyère",
  "The only journey is the one within. – Rainer Maria Rilke"
];

let quoteIndex = 0;
const quoteElement = document.getElementById('quote');

function displayQuote() {
  quoteElement.textContent = quotes[quoteIndex];
  quoteIndex = (quoteIndex + 1) % quotes.length;
}

displayQuote();
setInterval(displayQuote, 5000);