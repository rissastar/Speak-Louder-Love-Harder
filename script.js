const quotes = [
  "You are not alone 💖",
  "Healing is a journey, not a destination.",
  "Your story matters 🌟",
  "Progress, not perfection.",
  "Speak louder. Love harder.",
  "Even on your worst days, you are enough 💪",
];
let currentQuote = 0;

function rotateQuotes() {
  const quoteText = document.getElementById("quoteText");
  quoteText.textContent = quotes[currentQuote];
  currentQuote = (currentQuote + 1) % quotes.length;
}
setInterval(rotateQuotes, 4000);
window.onload = rotateQuotes;

// Theme toggle
document.getElementById("modeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("mode", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

document.getElementById("themeSelect").addEventListener("change", (e) => {
  document.body.classList.remove("theme-purple", "theme-green", "theme-pink");
  document.body.classList.add("theme-" + e.target.value);
  localStorage.setItem("theme", e.target.value);
});

// Remember user preferences
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "purple";
  const savedMode = localStorage.getItem("mode") || "light";
  document.body.classList.add("theme-" + savedTheme);
  document.getElementById("themeSelect").value = savedTheme;
  if (savedMode === "dark") {
    document.body.classList.add("dark-mode");
  }
});