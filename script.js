document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleButton && navLinks) {
    toggleButton.addEventListener('click', () => {
      toggleButton.classList.toggle('open');
      navLinks.classList.toggle('nav-open');

      // Accessibility: toggle aria-expanded
      const expanded = toggleButton.getAttribute('aria-expanded') === 'true';
      toggleButton.setAttribute('aria-expanded', !expanded);
    });

    // Optional: Close nav when link is clicked (on mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-open')) {
          navLinks.classList.remove('nav-open');
          toggleButton.classList.remove('open');
          toggleButton.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
});