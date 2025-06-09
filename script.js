function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");

  // Save to localStorage
  const isDark = body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDark);
}

// Load user preference
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }

  // Animate sections
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section, details, .collapsible-section').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
});