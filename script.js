// Typing animation setup
const header = document.getElementById('animated-header');
const headerContainer = document.querySelector('header');
const text = "Speak Louder, Love Harder 🌟";
let index = 0;
const typingSpeed = 150;
const fadeDuration = 1000; // ms

function type() {
  if (index < text.length) {
    header.textContent += text.charAt(index);
    index++;
    setTimeout(type, typingSpeed);
  } else {
    setTimeout(() => {
      headerContainer.style.opacity = '0';
      setTimeout(() => {
        header.textContent = '';
        index = 0;
        headerContainer.style.opacity = '1';
        type();
      }, fadeDuration);
    }, 1500);
  }
}

// Theme Toggle with localStorage persistence
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  let theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});

// Inspirational Quotes
const quotes = [
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "You are stronger than you think.", author: "Unknown" },
  { text: "Every day is a second chance.", author: "Unknown" },
  { text: "Your limitation—it's only your imagination.", author: "Unknown" },
  { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
  { text: "Great things never come from comfort zones.", author: "Unknown" },
  { text: "Dream it. Wish it. Do it.", author: "Unknown" },
  { text: "Success doesn't just find you. You have to go out and get it.", author: "Unknown" },
  { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" }
];

const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');

function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteText.textContent = `"${quote.text}"`;
  quoteAuthor.textContent = `— ${quote.author}`;
}

// Initialize
type();
displayRandomQuote();
setInterval(displayRandomQuote, 10000);