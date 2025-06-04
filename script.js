// Theme toggle
function toggleTheme() {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
}

// Color theme change
function changeColorTheme(theme) {
  document.documentElement.dataset.color = theme;
}

// Typewriter effect
const typewriterPhrases = [
  "You are not alone 💖",
  "Healing is possible 🌈",
  "Every voice matters 🗣️",
  "Together, we rise ✨"
];
let twIndex = 0, charIndex = 0;
const twTarget = document.getElementById("typewriter-text");

function typeWriter() {
  if (charIndex < typewriterPhrases[twIndex].length) {
    twTarget.textContent += typewriterPhrases[twIndex].charAt(charIndex++);
    setTimeout(typeWriter, 100);
  } else {
    setTimeout(() => {
      twTarget.textContent = "";
      charIndex = 0;
      twIndex = (twIndex + 1) % typewriterPhrases.length;
      typeWriter();
    }, 2000);
  }
}
typeWriter();

// Affirmation generator
const affirmations = [
  "You are worthy of love 💞",
  "You matter 🌟",
  "Your story is powerful 📖",
  "You are resilient 💪",
  "You are enough 💝",
];
function generateAffirmation() {
  const text = affirmations[Math.floor(Math.random() * affirmations.length)];
  document.getElementById("affirmation-text").textContent = text;
}

// Quote rotator
const quotes = [
  "You are braver than you believe.",
  "Let your light shine.",
  "Every scar tells a story of survival.",
  "Your voice has power.",
  "One step at a time 💫"
];
let quoteIndex = 0;
setInterval(() => {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  document.getElementById("quote-rotator").textContent = `"${quotes[quoteIndex]}"`;
}, 5000);

// Scroll animations
const scrollEls = document.querySelectorAll("[data-scroll-animate]");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
});
scrollEls.forEach(el => observer.observe(el));

// Scroll to top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
window.addEventListener("scroll", () => {
  document.getElementById("scrollToTopBtn").style.display = window.scrollY > 100 ? "block" : "none";
});

// Page loader
window.addEventListener("load", () => {
  document.getElementById("page-loader").classList.add("hidden");
});

// Custom cursor
const cursor = document.getElementById("custom-cursor");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});