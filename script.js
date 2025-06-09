function toggleDarkMode() {
  document.body.classList.toggle("light-mode");
  const button = document.querySelector('.toggle-dark');
  if (document.body.classList.contains("light-mode")) {
    button.textContent = "🌞 Light Mode";
  } else {
    button.textContent = "🌙 Dark Mode";
  }
}

// Collapse all other <details> when one opens (accordion effect)
document.addEventListener("DOMContentLoaded", () => {
  const details = document.querySelectorAll("details");

  details.forEach((targetDetail) => {
    targetDetail.addEventListener("click", () => {
      details.forEach((detail) => {
        if (detail !== targetDetail) {
          detail.removeAttribute("open");
        }
      });
    });
  });
});