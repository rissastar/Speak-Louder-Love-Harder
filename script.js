// Theme toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
  const html = document.documentElement;
  const newTheme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", newTheme);
});

// Color theme switch
document.getElementById("color-theme").addEventListener("change", (e) => {
  const color = e.target.value;
  document.documentElement.setAttribute("data-color", color);
});

// Quote rotator
const quotes = [
  "🌟 You are enough.",
  "🌈 Your voice matters.",
  "💖 Healing is not linear.",
  "✨ Keep shining.",
  "🔥 Speak louder. Love harder.",
  "🌻 You are not alone."
];
let quoteIndex = 0;
const quoteEl = document.querySelector(".quote-rotator");
function rotateQuote() {
  quoteEl.textContent = quotes[quoteIndex];
  quoteIndex = (quoteIndex + 1) % quotes.length;
}
setInterval(rotateQuote, 5000);
rotateQuote();

// Affirmation generator
const affirmations = [
  "I am strong and resilient.",
  "I radiate love and kindness.",
  "I believe in my healing.",
  "I am worthy of joy.",
  "My story matters.",
  "I choose hope every day."
];
document.getElementById("new-affirmation").addEventListener("click", () => {
  const affirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
  document.getElementById("affirmation-text").textContent = affirmation;
});

// Scroll to top button
const scrollBtn = document.getElementById("scrollToTopBtn");
window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Typing effect (once on load)
window.addEventListener("DOMContentLoaded", () => {
  const typeTarget = document.querySelector(".typewriter h2");
  const phrases = ["Inspire.", "Heal.", "Connect.", "Empower."];
  let i = 0, j = 0, currentPhrase = [], isDeleting = false;

  function loop() {
    const fullPhrase = phrases[i % phrases.length];
    if (!isDeleting && j <= fullPhrase.length) {
      currentPhrase = fullPhrase.slice(0, j++);
    } else if (isDeleting && j > 0) {
      currentPhrase = fullPhrase.slice(0, j--);
    }

    typeTarget.innerHTML = currentPhrase;

    if (!isDeleting && j === fullPhrase.length) {
      isDeleting = true;
      setTimeout(loop, 1000);
    } else if (isDeleting && j === 0) {
      isDeleting = false;
      i++;
      setTimeout(loop, 200);
    } else {
      setTimeout(loop, isDeleting ? 50 : 100);
    }
  }
  loop();
});

// Page loader
window.addEventListener("load", () => {
  document.getElementById("page-loader").classList.add("hidden");
});

// Scroll-triggered animation
const scrollElems = document.querySelectorAll("[data-scroll-animate]");
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});
scrollElems.forEach(el => scrollObserver.observe(el));

// Custom cursor
const cursor = document.getElementById("custom-cursor");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

const auth = firebase.auth();
const emailInput = document.getElementById("auth-email");
const passwordInput = document.getElementById("auth-password");
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const logoutBtn = document.getElementById("logout-btn");
const authMessage = document.getElementById("auth-message");

loginBtn.addEventListener("click", () => {
  auth.signInWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then(() => authMessage.textContent = "✅ Logged in!")
    .catch(err => authMessage.textContent = `❌ ${err.message}`);
});

registerBtn.addEventListener("click", () => {
  auth.createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then(() => authMessage.textContent = "✅ Registered!")
    .catch(err => authMessage.textContent = `❌ ${err.message}`);
});

logoutBtn.addEventListener("click", () => {
  auth.signOut().then(() => authMessage.textContent = "👋 Logged out!");
});

// Auth state listener
auth.onAuthStateChanged(user => {
  if (user) {
    authMessage.textContent = `👤 Logged in as ${user.email}`;
    logoutBtn.style.display = "inline-block";
    loginBtn.style.display = "none";
    registerBtn.style.display = "none";
  } else {
    authMessage.textContent = "🔒 Not logged in.";
    logoutBtn.style.display = "none";
    loginBtn.style.display = "inline-block";
    registerBtn.style.display = "inline-block";
  }
});

auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "login.html"; // or show login prompt
  }
});