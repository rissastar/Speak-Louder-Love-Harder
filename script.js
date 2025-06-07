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
    applyTheme(themes[selected]);
    localStorage.setItem('selectedTheme', selected);
  }
});

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

// === LOGIN FORM FUNCTIONALITY ===
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

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCzmBdZJrtHEoxcAHte2B8iMrea-ctSxy8",
  authDomain: "speak-louder-581d7.firebaseapp.com",
  projectId: "speak-louder-581d7",
  storageBucket: "speak-louder-581d7.firebasestorage.app",
  messagingSenderId: "674769404942",
  appId: "1:674769404942:web:1cbda7d50ff15208dce85f",
  measurementId: "G-54XJLK1CGJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const errorMsg = document.getElementById('errorMsg');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    errorMsg.style.display = 'none';

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        // Redirect on success
        window.location.href = 'dashboard.html';
      })
      .catch((error) => {
        // Show error message
        errorMsg.textContent = error.message;
        errorMsg.style.display = 'block';
      });
  });
});

// Firebase config - make sure yours matches exactly
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "speak-louder-581d7.firebaseapp.com",
  projectId: "speak-louder-581d7",
  storageBucket: "speak-louder-581d7.appspot.com",
  messagingSenderId: "YOUR_MSG_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Handle registration
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const displayName = document.getElementById("displayName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const errorMsg = document.getElementById("errorMsg");

  // Clear old error
  errorMsg.style.display = "none";
  errorMsg.textContent = "";

  if (password !== confirmPassword) {
    errorMsg.textContent = "Passwords do not match.";
    errorMsg.style.display = "block";
    return;
  }

  // Register the user
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      return userCredential.user.updateProfile({
        displayName: displayName
      });
    })
    .then(() => {
      // Redirect or show success
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      errorMsg.textContent = error.message;
      errorMsg.style.display = "block";
    });
});