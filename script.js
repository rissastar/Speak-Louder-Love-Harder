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

/* Import fonts */
@import url('https://fonts.googleapis.com/css2?family=Baloo+2&family=Fredoka:wght@400;600&display=swap');

:root {
  --bg-light: #f0f0ff;
  --bg-dark: #1e1e2f;
  --text-light: #222;
  --text-dark: #f0f0f0;
  --accent1: #d86ee6;
  --accent2: #6ee6c1;
  --accent3: #ff79c6;
  --glow: 0 0 12px rgba(255, 140, 255, 0.6);
}

body {
  margin: 0;
  font-family: 'Fredoka', sans-serif;
  background: var(--bg-light);
  color: var(--text-light);
  transition: background 0.3s, color 0.3s;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Dark mode */
body.dark {
  background: var(--bg-dark);
  color: var(--text-dark);
}

header {
  background: linear-gradient(90deg, var(--accent1), var(--accent3), var(--accent2));
  padding: 1.2rem 1rem;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  position: sticky;
  top: 0;
  z-index: 1000;
}

h1.glow {
  font-family: 'Baloo 2', cursive;
  font-size: 2.2rem;
  color: white;
  text-shadow: var(--glow);
}

.user-area {
  margin-top: 0.8rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.user-area button {
  font-family: inherit;
  background: var(--accent3);
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  transition: background 0.3s;
}

.user-area button:hover {
  background: var(--accent1);
}

/* Theme toggle button */
#theme-toggle {
  background: var(--accent2);
}

/* Main content */
main {
  flex: 1;
  padding: 1.5rem;
  text-align: center;
}

.quote {
  font-size: 1.5rem;
  margin: 1rem auto;
  padding: 1rem;
  max-width: 600px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4px);
  box-shadow: 0 0 8px rgba(255, 140, 255, 0.3);
}

body.dark .quote {
  background: rgba(50, 50, 70, 0.5);
}

/* Navigation */
nav ul {
  list-style: none;
  padding: 0;
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

nav li a {
  display: block;
  background: var(--accent1);
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.2rem;
  border-radius: 30px;
  font-weight: bold;
  transition: background 0.3s, transform 0.2s;
}

nav li a:hover {
  background: var(--accent2);
  transform: scale(1.05);
}

footer {
  background: linear-gradient(90deg, var(--accent2), var(--accent3));
  color: white;
  text-align: center;
  padding: 1rem;
  font-size: 0.95rem;
  box-shadow: 0 -4px 10px rgba(0,0,0,0.15);
}

/* Responsive */
@media (max-width: 600px) {
  h1.glow {
    font-size: 1.6rem;
  }

  nav li a {
    font-size: 0.9rem;
    padding: 0.6rem 1rem;
  }

  .quote {
    font-size: 1.2rem;
  }
}