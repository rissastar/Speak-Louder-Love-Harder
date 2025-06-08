const quotes = [
  "You are not alone.",
  "Keep going, you’re doing great.",
  "Every storm runs out of rain.",
  "Your story isn’t over yet.",
  "Healing is not linear."
];

function rotateQuotes() {
  const idx = Math.floor(Math.random() * quotes.length);
  document.title = quotes[idx] + " | Inspire & Connect";
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
}

window.onload = () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
  setInterval(rotateQuotes, 5000);
};