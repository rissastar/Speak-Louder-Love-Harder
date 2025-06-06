// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  let theme = 'light';
  if (document.body.classList.contains('dark-mode')) {
    theme = 'dark';
  }
  localStorage.setItem('theme', theme);
});

// Auto-Rotating Inspirational Quotes
const quotes = [
  { text: "Your current quote will appear here.", author: "Author" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "You are stronger than you think.", author: "Unknown" },
  { text: "Every day is a second chance.", author: "Unknown" },
  { text: "Your story isn't over yet.", author: "Unknown" },
  { text: "Inhale courage, exhale fear.", author: "Unknown" },
  { text: "You matter. You are loved.", author: "Unknown" },
  { text: "Healing takes time, and that's okay.", author: "Unknown" }
];

let currentQuote = 0;
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');

function displayQuote(index) {
  quoteText.textContent = `"${quotes[index].text}"`;
  quoteAuthor.textContent = `- ${quotes[index].author}`;
}

function rotateQuotes() {
  displayQuote(currentQuote);
  currentQuote = (currentQuote + 1) % quotes.length;
}

rotateQuotes();
setInterval(rotateQuotes, 10000); // Change quote every 10 seconds

function logout() {
  localStorage.setItem("isLoggedIn", "false");
  window.location.href = "index.html";
}

// LOGIN STATUS DISPLAY
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const welcomeMessage = document.getElementById("welcomeMessage");

const storedUser = JSON.parse(localStorage.getItem("user"));
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

if (isLoggedIn && storedUser) {
  loginBtn.style.display = "none";
  logoutBtn.style.display = "inline-block";
  welcomeMessage.textContent = `Welcome, ${storedUser.email.split('@')[0]}! 💖`;
} else {
  loginBtn.style.display = "inline-block";
  logoutBtn.style.display = "none";
}

loginBtn.addEventListener("click", () => {
  window.location.href = "login.html";
});

logoutBtn.addEventListener("click", () => {
  localStorage.setItem("isLoggedIn", "false");
  location.reload();
});

// Redirect to login page on login button click
document.getElementById("loginBtn")?.addEventListener("click", () => {
  window.location.href = "login.html";
});

const storedUser = JSON.parse(localStorage.getItem("user"));
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const welcomeMessage = document.getElementById("welcomeMessage");

if (loginBtn && logoutBtn && welcomeMessage) {
  if (isLoggedIn && storedUser) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
    welcomeMessage.textContent = `Welcome, ${storedUser.email.split('@')[0]}! 💖`;
  } else {
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
  }

  logoutBtn.addEventListener("click", () => {
    localStorage.setItem("isLoggedIn", "false");
    location.reload();
  });
}