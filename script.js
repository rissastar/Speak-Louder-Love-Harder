// === DARK MODE TOGGLE ===
const themeToggle = document.getElementById("theme-toggle");
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}
themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

// === THEME SELECTION ===
const themeSelect = document.getElementById("themeSelect");
const customForm = document.getElementById("customThemeForm");
const customPrimary = document.getElementById("customPrimary");
const customSecondary = document.getElementById("customSecondary");
const customAccent = document.getElementById("customAccent");

function applyTheme(theme) {
  document.body.classList.remove("theme-vibrant", "theme-pastel", "theme-ocean", "theme-sunset");
  if (theme === "custom") {
    const customTheme = JSON.parse(localStorage.getItem("customTheme"));
    if (customTheme) {
      document.documentElement.style.setProperty('--primary-color', customTheme.primary);
      document.documentElement.style.setProperty('--secondary-color', customTheme.secondary);
      document.documentElement.style.setProperty('--accent-color', customTheme.accent);
    }
  } else {
    document.documentElement.removeAttribute('style');
    document.body.classList.add(`theme-${theme}`);
  }
  localStorage.setItem("colorTheme", theme);
  if (themeSelect) themeSelect.value = theme;
}

function saveCustomTheme() {
  const customTheme = {
    primary: customPrimary.value,
    secondary: customSecondary.value,
    accent: customAccent.value
  };
  localStorage.setItem("customTheme", JSON.stringify(customTheme));
  applyTheme("custom");
  alert("✨ Custom theme saved!");
}

const savedTheme = localStorage.getItem("colorTheme") || "vibrant";
applyTheme(savedTheme);
if (themeSelect) themeSelect.value = savedTheme;

themeSelect?.addEventListener("change", () => {
  const selected = themeSelect.value;
  customForm.style.display = (selected === "custom") ? "flex" : "none";
  applyTheme(selected);
});

// === QUOTES ROTATOR ===
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
  const q = quotes[currentQuote];
  document.getElementById("quote")?.textContent = `"${q.text}"`;
  document.getElementById("author")?.textContent = `- ${q.author}`;
  currentQuote = (currentQuote + 1) % quotes.length;
}
displayQuote();
setInterval(displayQuote, 10000);

// === AUTH BUTTONS ===
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");
const welcomeMessage = document.getElementById("welcomeMessage");

const storedUser = JSON.parse(localStorage.getItem("user"));
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

if (storedUser && isLoggedIn) {
  loginBtn && (loginBtn.style.display = "none");
  registerBtn && (registerBtn.style.display = "none");
  logoutBtn && (logoutBtn.style.display = "inline-block");
  welcomeMessage && (welcomeMessage.textContent = `Welcome, ${storedUser.email.split('@')[0]} 💖`);
} else {
  loginBtn && (loginBtn.style.display = "inline-block");
  registerBtn && (registerBtn.style.display = "inline-block");
  logoutBtn && (logoutBtn.style.display = "none");
  welcomeMessage && (welcomeMessage.textContent = "");
}

loginBtn?.addEventListener("click", () => {
  window.location.href = "login.html";
});

registerBtn?.addEventListener("click", () => {
  window.location.href = "register.html";
});

logoutBtn?.addEventListener("click", () => {
  localStorage.setItem("isLoggedIn", "false");
  location.reload();
});

// === TABS (for mental health page) ===
document.querySelectorAll(".tab-buttons").forEach(tabGroup => {
  const buttons = tabGroup.querySelectorAll(".tab-btn");
  const tabContainer = tabGroup.parentElement;
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach(btn => btn.classList.remove("active"));
      tabContainer.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
      button.classList.add("active");
      tabContainer.querySelector(`#${button.dataset.tab}`)?.classList.add("active");
    });
  });
});

// === LOGIN PAGE FUNCTIONALITY ===
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const loginError = document.getElementById("loginError");
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email === email && user.password === password) {
      localStorage.setItem("isLoggedIn", "true");
      loginError.textContent = "";
      window.location.href = "profile.html";
    } else {
      loginError.textContent = "⚠️ Invalid email or password.";
    }
  });
}