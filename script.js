// Theme Toggle
const toggleBtn = document.querySelector('.theme-toggle-btn');
const body = document.body;

// Load theme preference from localStorage
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
}

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  const theme = body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});

// Quote Rotator
const quotes = [
  "Your voice matters. Use it to heal and help. 💜",
  "You are stronger than your past. 🌱",
  "Together we rise, together we heal. 🤝",
  "Every scar has a story worth sharing. ✨",
  "Kindness is the loudest voice. 💚",
  "Healing is not linear — but it is worth it. 🦋",
  "Love harder, speak louder, always. 🌟"
];

let quoteIndex = 0;
const quoteElement = document.getElementById('quote-rotator');

function showQuote() {
  quoteElement.style.opacity = 0;
  setTimeout(() => {
    quoteElement.textContent = quotes[quoteIndex];
    quoteElement.style.opacity = 1;
    quoteIndex = (quoteIndex + 1) % quotes.length;
  }, 400);
}

// Start rotating quotes every 6 seconds
showQuote();
setInterval(showQuote, 6000);