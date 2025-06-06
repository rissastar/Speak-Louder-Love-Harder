const quotes = [
  "“You are stronger than you think.”",
  "“Healing isn’t linear, and that’s okay.”",
  "“You matter. You are not alone.”",
  "“Speak your truth, even if your voice shakes.”",
  "“Love louder than hate.”"
];

let i = 0;
const quoteElement = document.getElementById('quote');

setInterval(() => {
  i = (i + 1) % quotes.length;
  quoteElement.textContent = quotes[i];
}, 5000);

// Theme Toggle
const toggleBtn = document.getElementById('theme-toggle');
const theme = localStorage.getItem('theme');

if (theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

toggleBtn.onclick = () => {
  const current = document.documentElement.getAttribute('data-theme');
  const newTheme = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
};