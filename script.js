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

// 🌈 THEME VARIANTS HANDLER
const themeSelect = document.getElementById("themeSelect");

function applyTheme(theme) {
  document.body.classList.remove("theme-vibrant", "theme-pastel", "theme-ocean", "theme-sunset");
  document.body.classList.add(`theme-${theme}`);
  localStorage.setItem("colorTheme", theme);
}

// Load saved theme
const savedTheme = localStorage.getItem("colorTheme") || "vibrant";
applyTheme(savedTheme);
if (themeSelect) themeSelect.value = savedTheme;

// Handle theme selection change
themeSelect?.addEventListener("change", () => {
  const selectedTheme = themeSelect.value;
  applyTheme(selectedTheme);
});

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
    document.body.classList.add(`theme-${theme}`);
    // Reset CSS vars in case custom theme was active
    document.documentElement.removeAttribute('style');
  }

  localStorage.setItem("colorTheme", theme);
  if (themeSelect) themeSelect.value = theme;
}

// Save custom theme
function saveCustomTheme() {
  const customTheme = {
    primary: customPrimary.value,
    secondary: customSecondary.value,
    accent: customAccent.value
  };
  localStorage.setItem("customTheme", JSON.stringify(customTheme));
  applyTheme("custom");
  alert("✨ Your custom theme has been saved!");
}

// Load on startup
const savedTheme = localStorage.getItem("colorTheme") || "vibrant";
applyTheme(savedTheme);

// Watch selector
themeSelect?.addEventListener("change", () => {
  const value = themeSelect.value;
  if (value === "custom") {
    customForm.style.display = "flex";
    const saved = JSON.parse(localStorage.getItem("customTheme"));
    if (saved) {
      customPrimary.value = saved.primary;
      customSecondary.value = saved.secondary;
      customAccent.value = saved.accent;
    }
  } else {
    customForm.style.display = "none";
  }
  applyTheme(value);
});

<script>
  document.querySelectorAll('.tab-buttons').forEach(buttonGroup => {
    const buttons = buttonGroup.querySelectorAll('.tab-btn');
    const tabContents = buttonGroup.parentElement.querySelectorAll('.tab-content');

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active from all
        buttons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(tab => tab.classList.remove('active'));

        // Add active to clicked
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
      });
    });
  });
</script>