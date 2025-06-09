function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');

  const icon = document.querySelector('.toggle-dark');
  if (document.body.classList.contains('dark-mode')) {
    icon.textContent = '☀️ Light Mode';
  } else {
    icon.textContent = '🌙 Dark Mode';
  }
}

// Optional: Animate <details> opening
document.querySelectorAll("details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (detail.open) {
      detail.style.animation = "fadeIn 0.5s ease-in-out";
    }
  });
});