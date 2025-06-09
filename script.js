function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// Add glow when summary is clicked
document.querySelectorAll("details summary").forEach(summary => {
  summary.addEventListener("click", () => {
    summary.parentElement.classList.toggle("active-glow");
  });
});

// Animate in sections on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.section, details, .collapsible-section').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Fade-in animation class
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);