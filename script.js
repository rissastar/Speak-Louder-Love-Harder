// Dark/Light Toggle
const toggle = document.querySelector('.dark-toggle');
const body = document.body;

toggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
});

if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light-mode');
}

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

menuToggle.addEventListener('click', () => {
  mobileNav.style.display = mobileNav.style.display === 'flex' ? 'none' : 'flex';
});

// Quote Rotator
const quotes = [
  "Even in darkness, stars shine brightest.",
  "You are not alone. You are loved.",
  "Your story matters. Keep going.",
  "Healing is not linear, but it's worth it.",
  "Breathe. You’ve got this.",
];
let current = 0;
const quoteBox = document.getElementById("quoteBox");

setInterval(() => {
  current = (current + 1) % quotes.length;
  quoteBox.innerText = quotes[current];
}, 10000);