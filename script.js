// Theme Toggle (Light <-> Dark)
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

// Quote Rotator
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
    void rotator.offsetWidth; // reset animation
    rotator.classList.add("fade-in");
    rotator.textContent = quotes[index];
  }, 5000);
}

// Scroll-Based Navbar Animation (optional)
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Button Ripple Effect
document.addEventListener("click", function (e) {
  const target = e.target;
  if (target.classList.contains("btn-link") || target.tagName === "A") {
    const circle = document.createElement("span");
    circle.classList.add("ripple");
    target.appendChild(circle);

    const diameter = Math.max(target.clientWidth, target.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.offsetX - radius}px`;
    circle.style.top = `${e.offsetY - radius}px`;

    setTimeout(() => circle.remove(), 600);
  }
});

// Scroll Reveal (Simple fade-in on scroll)
function handleScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }
    });
  }, {
    threshold: 0.1
  });

  revealElements.forEach(el => observer.observe(el));
}