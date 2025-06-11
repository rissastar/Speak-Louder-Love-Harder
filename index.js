document.querySelector('.dropdown-toggle').addEventListener('click', () => {
  const menu = document.querySelector('.dropdown-menu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

const quotes = [
  "Healing doesn’t mean the damage never existed. It means the damage no longer controls our lives.",
  "Your story isn’t over yet.",
  "In the middle of difficulty lies opportunity.",
  "You are not alone. You are seen. You are heard.",
  "Recovery is not a race. You don’t have to feel guilty if it takes you longer than you thought it would.",
  "Every day may not be good, but there is something good in every day.",
  "Sometimes the bravest thing you can do is ask for help.",
  "Let your scars remind you of not what you lost, but what you survived.",
  "The strongest people are not those who show strength in front of us but those who fight battles we know nothing about.",
  "It's okay to not be okay."
];

let quoteIndex = 0;
function rotateQuotes() {
  document.getElementById('quote-display').innerText = quotes[quoteIndex];
  quoteIndex = (quoteIndex + 1) % quotes.length;
}

rotateQuotes();
setInterval(rotateQuotes, 5000);