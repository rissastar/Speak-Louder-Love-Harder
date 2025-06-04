// Theme Toggle
function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Load Saved Theme
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  }
  startQuoteRotation();
  handleScrollReveal();
});

// Rotating Quotes
function startQuoteRotation() {
  const quotes = [
    "You are stronger than your silence.",
    "Healing isn't linear — give yourself grace.",
    "Love louder than hate. 💛",
    "You matter. Always have, always will.",
    "Progress, not perfection. One step at a time.",
    "Speak up. Love fiercely. Heal deeply.",
    "Kindness is louder than cruelty.",
    "Your story isn’t over yet. ✨"
  ];
  let index = 0;
  const rotator = document.getElementById("quote-rotator");
  if (!rotator) return;

  rotator.textContent = quotes[index];
  setInterval(() => {
    index = (index + 1) % quotes.length;
    rotator.classList.remove("fade-in");
    void rotator.offsetWidth;
    rotator.classList.add("fade-in");
    rotator.textContent = quotes[index];
  }, 5000);
}

// Header Scroll Animation
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Scroll Reveal
function handleScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));
}