// Theme toggler with rotation
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(dark) {
  if (dark) {
    body.classList.add('dark');
    toggleBtn.textContent = '☀️';
  } else {
    body.classList.remove('dark');
    toggleBtn.textContent = '🌙';
  }
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme === 'dark');
} else {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(prefersDark);
}

toggleBtn.addEventListener('click', () => {
  toggleBtn.classList.add('rotate');
  setTimeout(() => {
    const isDark = body.classList.contains('dark');
    setTheme(!isDark);
    toggleBtn.classList.remove('rotate');
  }, 500);
});

// Quote rotator
const quotes = [
  {
    text: "Your voice matters. Your story matters. You are not alone. Healing begins when love is louder than fear.",
    author: "— Speak Louder, Love Harder 🌟"
  },
  {
    text: "Even in your darkest hour, your light is not gone — it's just waiting to shine again.",
    author: "— Unknown"
  },
  {
    text: "Healing doesn't mean the damage never existed. It means it no longer controls your life.",
    author: "— Akshay Dubey"
  },
  {
    text: "You survived 100% of your worst days. That’s strength. That’s power.",
    author: "— Speak Louder, Love Harder 🌟"
  },
  {
    text: "Be the love you needed when you were hurting.",
    author: "— SL❤️LH"
  },
  {
    text: "We rise by lifting others. Together, healing is louder.",
    author: "— Speak Louder, Love Harder 🌟"
  }
];

let quoteIndex = 0;
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");

function rotateQuote() {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  const { text, author } = quotes[quoteIndex];
  quoteText.classList.add("fade-out");
  quoteAuthor.classList.add("fade-out");

  setTimeout(() => {
    quoteText.textContent = `"${text}"`;
    quoteAuthor.textContent = author;
    quoteText.classList.remove("fade-out");
    quoteText.classList.add("fade-in");
    quoteAuthor.classList.remove("fade-out");
    quoteAuthor.classList.add("fade-in");
  }, 500);
}

setInterval(rotateQuote, 7000);