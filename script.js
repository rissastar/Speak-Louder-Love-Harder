// 🌗 Theme Toggle & Memory
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
themeToggle.addEventListener('click', () => {
  const currentTheme = root.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// 🎨 Color Theme Selector
const colorSelector = document.getElementById('color-theme-selector');
colorSelector.addEventListener('change', () => {
  const newColor = colorSelector.value;
  root.setAttribute('data-color', newColor);
  localStorage.setItem('color-theme', newColor);
});

// 🧠 Restore Preferences
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  const savedColor = localStorage.getItem('color-theme') || 'default';
  root.setAttribute('data-theme', savedTheme);
  root.setAttribute('data-color', savedColor);
});

// 💬 Quote Rotator
const quotes = [
  "Healing begins when we choose to speak up.",
  "You are not alone. Your voice matters.",
  "Every scar tells a story of survival.",
  "Be proud of how far you’ve come.",
  "You deserve love, healing, and hope.",
];
const quoteBox = document.getElementById('quote-rotator');
let quoteIndex = 0;
setInterval(() => {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  quoteBox.textContent = quotes[quoteIndex];
}, 5000);

// 🌟 Affirmation Generator
const affirmations = [
  "I am worthy of love and kindness.",
  "I have the strength to keep going.",
  "My past does not define my future.",
  "I am enough, just as I am.",
  "I deserve to feel safe and supported.",
];
document.getElementById('new-affirmation').addEventListener('click', () => {
  const box = document.getElementById('affirmation-box');
  const affirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
  box.textContent = affirmation;
});

// ⬆️ Scroll To Top
const scrollBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ✨ Scroll Animation
const animatedElements = document.querySelectorAll('[data-scroll-animate]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
});
animatedElements.forEach(el => observer.observe(el));

// 🌀 Custom Cursor
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', e => {
  cursor.style.top = e.clientY + 'px';
  cursor.style.left = e.clientX + 'px';
});