// ==== Inspirational Quotes Rotator ====
const quotes = [
  "You are not alone.",
  "One day at a time, one step at a time.",
  "Your story matters and your voice is heard.",
  "Together, we can make a difference.",
  "Spread love, spread hope."
];

let quoteIndex = 0;
const quoteElem = document.getElementById("quote");

function updateQuote() {
  quoteElem.textContent = quotes[quoteIndex];
  quoteIndex = (quoteIndex + 1) % quotes.length;
}
setInterval(updateQuote, 5000); // Rotate every 5s

// ==== Theme Toggle (Dark/Light Mode) ====
const themeToggle = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "Light Mode";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const theme = document.body.classList.contains("dark") ? "dark" : "light";
  themeToggle.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
  localStorage.setItem("theme", theme);
});

// ==== Mobile Navigation (Hamburger Menu) ====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// ==== Firebase Auth Placeholder ====
// Note: You must include Firebase SDK via <script> tag or modules
// Then replace the firebaseConfig below with your actual config.

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase (uncomment when Firebase is set up)
// firebase.initializeApp(firebaseConfig);

// Example Firebase auth logic (for future integration)
/*
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("User signed in:", user.email);
  } else {
    console.log("No user signed in.");
  }
});
*/