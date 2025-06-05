document.addEventListener("DOMContentLoaded", () => {
  // Remove loader
  document.getElementById("loader").style.display = "none";

  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const prefersDark = localStorage.getItem("theme") === "dark";
  if (prefersDark) document.body.classList.add("dark");

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  });

  // Auto-Rotating Quotes
  const quotes = [
    "You are stronger than you think.",
    "Healing isn’t linear, but it is possible.",
    "Your voice matters. Your story matters.",
    "Even on your worst days, you are worthy of love.",
    "Every small step counts 💖"
  ];
  let current = 0;
  const quoteBox = document.getElementById("quote-box");

  function rotateQuotes() {
    quoteBox.textContent = quotes[current];
    current = (current + 1) % quotes.length;
    setTimeout(rotateQuotes, 5000);
  }

  if (quoteBox) rotateQuotes();
});