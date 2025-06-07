// === DARK MODE TOGGLE ===
const themeToggle = document.getElementById("theme-toggle");
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}
themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

// === THEME SELECTOR ===
const themes = {
  vibrant: {
    '--primary-color': '#7f00ff',
    '--secondary-color': '#39ff14',
    '--accent-color': '#ff007f'
  },
  pastel: {
    '--primary-color': '#ffc0cb',
    '--secondary-color': '#b0e0e6',
    '--accent-color': '#dda0dd'
  },
  ocean: {
    '--primary-color': '#006994',
    '--secondary-color': '#00ced1',
    '--accent-color': '#20b2aa'
  },
  sunset: {
    '--primary-color': '#ff5e62',
    '--secondary-color': '#ff9966',
    '--accent-color': '#ffcc70'
  }
};

function applyTheme(themeVars) {
  for (const variable in themeVars) {
    document.documentElement.style.setProperty(variable, themeVars[variable]);
  }
}

function saveCustomTheme() {
  const customTheme = {
    '--primary-color': document.getElementById('customPrimary').value,
    '--secondary-color': document.getElementById('customSecondary').value,
    '--accent-color': document.getElementById('customAccent').value
  };
  applyTheme(customTheme);
  localStorage.setItem('selectedTheme', 'custom');
  localStorage.setItem('customTheme', JSON.stringify(customTheme));
}

const themeSelect = document.getElementById('themeSelect');
themeSelect?.addEventListener('change', function () {
  const selected = this.value;

  if (selected === 'custom') {
    document.getElementById('customThemeForm').style.display = 'block';
  } else {
    document.getElementById('customThemeForm').style.display = 'none';
    if (themes[selected]) {
      applyTheme(themes[selected]);
      localStorage.setItem('selectedTheme', selected);
    }
  }
});

// Restore theme on page load
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('selectedTheme');
  const custom = localStorage.getItem('customTheme');

  if (saved) {
    if (themeSelect) themeSelect.value = saved;

    if (saved === 'custom' && custom) {
      const customColors = JSON.parse(custom);
      applyTheme(customColors);
      document.getElementById('customPrimary').value = customColors['--primary-color'];
      document.getElementById('customSecondary').value = customColors['--secondary-color'];
      document.getElementById('customAccent').value = customColors['--accent-color'];
      document.getElementById('customThemeForm').style.display = 'block';
    } else if (themes[saved]) {
      applyTheme(themes[saved]);
      document.getElementById('customThemeForm').style.display = 'none';
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

// === AUTH BUTTONS (LOGIN / REGISTER / LOGOUT) ===
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");
const welcomeMessage = document.getElementById("welcomeMessage");

const storedUser = JSON.parse(localStorage.getItem("user"));
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

if (storedUser && isLoggedIn) {
  loginBtn?.style.setProperty("display", "none");
  registerBtn?.style.setProperty("display", "none");
  logoutBtn?.style.setProperty("display", "inline-block");
  welcomeMessage && (welcomeMessage.textContent = `Welcome, ${storedUser.email.split('@')[0]} 💖`);
} else {
  loginBtn?.style.setProperty("display", "inline-block");
  registerBtn?.style.setProperty("display", "inline-block");
  logoutBtn?.style.setProperty("display", "none");
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

// === TABS (Mental Health page) ===
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

// === CUSTOM THEME SAVE BUTTON ===
// Assuming you have a save button for custom theme
document.getElementById("saveCustomThemeBtn")?.addEventListener("click", saveCustomTheme);