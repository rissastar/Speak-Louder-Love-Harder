// Theme Toggle
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  body.classList.add("dark-mode");
}

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
});

// Rotating Quotes
const quotes = [
  "You are stronger than your struggles 💪",
  "Healing is not linear 💖",
  "Your story matters 📖",
  "You are not alone 🌈",
  "Love yourself loudly 💜",
  "Peace begins within 🕊️"
];

let quoteIndex = 0;
const quoteEl = document.getElementById("quote");

function rotateQuote() {
  quoteEl.textContent = quotes[quoteIndex];
  quoteIndex = (quoteIndex + 1) % quotes.length;
}
setInterval(rotateQuote, 5000);
rotateQuote();

// Login/logout simulation
function logout() {
  localStorage.removeItem("user");
  alert("Logged out.");
  location.href = "index.html";
}