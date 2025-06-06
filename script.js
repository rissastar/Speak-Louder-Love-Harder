// 🌗 THEME TOGGLE (Dark/Light Mode)
const themeToggle = document.getElementById("theme-toggle");
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}
themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const newTheme = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", newTheme);
});

// 💬 INSPIRATIONAL QUOTES ROTATOR
const quotes = [
  { text: "You are stronger than you think.", author: "Unknown" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Every day is a second chance.", author: "Unknown" },
  { text: "Your story isn't over yet.", author: "Unknown" },
  { text: "Inhale courage, exhale fear.", author: "Unknown" },
  { text: "You matter. You are loved.", author: "Unknown" },
  { text: "Healing takes time, and that's okay.", author: "Unknown" }
];

let currentQuote = 0;
function displayQuote() {
  const quoteEl = document.getElementById("quote");
  const authorEl = document.getElementById("author");
  if (quoteEl && authorEl) {
    const q = quotes[currentQuote];
    quoteEl.textContent = `"${q.text}"`;
    authorEl.textContent = `- ${q.author}`;
    currentQuote = (currentQuote + 1) % quotes.length;
  }
}
displayQuote();
setInterval(displayQuote, 10000); // ⏱ rotate every 10 seconds

// 👤 LOGIN/LOGOUT UI LOGIC
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const welcomeMessage = document.getElementById("welcomeMessage");

const storedUser = JSON.parse(localStorage.getItem("user"));
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

if (storedUser && isLoggedIn) {
  loginBtn?.style?.setProperty("display", "none");
  logoutBtn?.style?.setProperty("display", "inline-block");
  if (welcomeMessage) {
    welcomeMessage.textContent = `Welcome, ${storedUser.email.split('@')[0]} 💖`;
  }
} else {
  loginBtn?.style?.setProperty("display", "inline-block");
  logoutBtn?.style?.setProperty("display", "none");
}

loginBtn?.addEventListener("click", () => {
  window.location.href = "login.html";
});

logoutBtn?.addEventListener("click", () => {
  localStorage.setItem("isLoggedIn", "false");
  location.reload();
});

// 📝 PROFILE PAGE – BIO SAVE FUNCTIONALITY
const bioBox = document.getElementById("userBio");
const savedMsg = document.getElementById("savedMsg");

if (bioBox && savedMsg) {
  bioBox.value = localStorage.getItem("userBio") || "";
}

function saveBio() {
  if (bioBox && savedMsg) {
    localStorage.setItem("userBio", bioBox.value);
    savedMsg.style.opacity = 1;
    setTimeout(() => (savedMsg.style.opacity = 0), 2000);
  }
}