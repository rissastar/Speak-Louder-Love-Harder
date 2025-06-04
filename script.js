function toggleTheme() {
  const body = document.body;
  const dark = body.classList.toggle('dark');
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
  rotateQuotes();
});

function rotateQuotes() {
  const quotes = [
    "You are stronger than your silence.",
    "Healing isn't linear — give yourself grace.",
    "Love louder than hate. 💛",
    "You matter. Always have, always will.",
    "Progress, not perfection. One step at a time.",
    "Speak up. Love fiercely. Heal deeply.",
    "Kindness is louder than cruelty.",
    "Your story isn’t over yet. ✨"
  ];
  let index = 0;
  const el = document.getElementById("quote-rotator");
  setInterval(() => {
    index = (index + 1) % quotes.length;
    el.textContent = quotes[index];
    el.classList.remove("fadeInUp");
    void el.offsetWidth;
    el.classList.add("fadeInUp");
  }, 5000);
}