const quotes = [
  "You’re stronger than you think.",
  "One day at a time.",
  "You deserve love and care.",
  "Progress, not perfection.",
  "Healing is not linear. 🌱",
  "Your story matters.",
  "Be kind to your mind."
];
let idx = 0;

function rotateQuote() {
  const el = document.getElementById("quote-box");
  idx = (idx + 1) % quotes.length;
  el.textContent = quotes[idx];
}

setInterval(rotateQuote, 5000);

const toggle = document.getElementById("theme-toggle");
const body = document.body;

function loadTheme() {
  const t = localStorage.getItem("theme");
  if (t === "dark") body.classList.add("dark");
}
function saveTheme() {
  localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
}

toggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  saveTheme();
});

loadTheme();