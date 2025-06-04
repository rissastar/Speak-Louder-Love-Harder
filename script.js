// Theme Toggle
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌓";
});

// Quote Rotator
const quotes = [
  {
    text: "Your voice matters. Your story matters. You are not alone.",
    author: "— Speak Louder, Love Harder 🌟"
  },
  {
    text: "Even in your darkest hour, your light is not gone.",
    author: "— Unknown"
  },
  {
    text: "Healing doesn't mean the pain never existed.",
    author: "— Akshay Dubey"
  }
];

let index = 0;
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");

function rotateQuote() {
  index = (index + 1) % quotes.length;
  quoteText.textContent = `"${quotes[index].text}"`;
  quoteAuthor.textContent = quotes[index].author;
}
setInterval(rotateQuote, 6000);