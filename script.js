// Handle Light/Dark Theme Toggle
const toggle = document.getElementById("theme-toggle");
const body = document.body;

toggle.addEventListener("click", () => {
  body.classList.toggle("light-theme");
});

// Optional: Keyboard accessibility
toggle.addEventListener("keypress", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    body.classList.toggle("light-theme");
  }
});