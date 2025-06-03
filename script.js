// Theme Toggle Button
const body = document.body;
const toggleButton = document.createElement("button");

toggleButton.textContent = "🎨 Toggle Theme";
toggleButton.className = "magic-link";
toggleButton.style.position = "fixed";
toggleButton.style.top = "1rem";
toggleButton.style.right = "1rem";

document.body.appendChild(toggleButton);

toggleButton.addEventListener("click", () => {
  body.classList.toggle("funky-theme");
});