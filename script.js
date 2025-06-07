// === DARK MODE TOGGLE ===
const themeToggle = document.getElementById("theme-toggle");
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}
themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

// === THEME SELETCTOR ===
const themes = {
  vibrant: {
    '--primary': '#7f00ff',
    '--secondary': '#39ff14',
    '--accent': '#ff007f'
  },
  pastel: {
    '--primary': '#ffc0cb',
    '--secondary': '#b0e0e6',
    '--accent': '#dda0dd'
  },
  ocean: {
    '--primary': '#006994',
    '--secondary': '#00ced1',
    '--accent': '#20b2aa'
  },
  sunset: {
    '--primary': '#ff5e62',
    '--secondary': '#ff9966',
    '--accent': '#ffcc70'
  }
};

document.getElementById('themeSelect').addEventListener('change', function () {
  const selected = this.value;

  if (selected === 'custom') {
    document.getElementById('customThemeForm').style.display = 'block';
  } else {
    document.getElementById('customThemeForm').style.display = 'none';
    applyTheme(themes[selected]);
    localStorage.setItem('selectedTheme', selected);
  }
});

function applyTheme(themeVars) {
  for (const variable in themeVars) {
    document.documentElement.style.setProperty(variable, themeVars[variable]);
  }
}

function saveCustomTheme() {
  const customTheme = {
    '--primary': document.getElementById('customPrimary').value,
    '--secondary': document.getElementById('customSecondary').value,
    '--accent': document.getElementById('customAccent').value
  };
  applyTheme(customTheme);
  localStorage.setItem('selectedTheme', 'custom');
  localStorage.setItem('customTheme', JSON.stringify(customTheme));
}

// Load saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('selectedTheme');
  const custom = localStorage.getItem('customTheme');

  if (saved) {
    document.getElementById('themeSelect').value = saved;

    if (saved === 'custom' && custom) {
      const customColors = JSON.parse(custom);
      applyTheme(customColors);
      document.getElementById('customPrimary').value = customColors['--primary'];
      document.getElementById('customSecondary').value = customColors['--secondary'];
      document.getElementById('customAccent').value = customColors['--accent'];
      document.getElementById('customThemeForm').style.display = 'block';
    } else if (themes[saved]) {
      applyTheme(themes[saved]);
    }
  }
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