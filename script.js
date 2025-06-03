document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Elements to fade in/out (all sections)
  const sections = document.querySelectorAll('section');

  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  // Theme toggle click handler
  themeToggle.addEventListener('click', () => {
    const newTheme = body.classList.contains('light-theme') ? 'dark' : 'light';
    fadeOutIn(() => setTheme(newTheme));
  });

  // Keyboard accessibility for theme toggle
  themeToggle.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      themeToggle.click();
    }
  });

  function setTheme(theme) {
    if (theme === 'light') {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
      themeToggle.textContent = '🌙'; // Show moon to switch back to dark
    } else {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
      themeToggle.textContent = '🌓'; // Show sun/moon icon for dark
    }
    localStorage.setItem('theme', theme);
  }

  // Fade out all sections, then run callback, then fade in
  function fadeOutIn(callback) {
    // Add fade-out class to all sections
    sections.forEach(section => {
      section.classList.add('fade-out');
      section.classList.remove('fade-in');
    });

    // Wait for fade-out transition (~600ms)
    setTimeout(() => {
      callback();

      // Fade sections back in
      sections.forEach(section => {
        section.classList.remove('fade-out');
        section.classList.add('fade-in');
      });
    }, 600);
  }

  // On initial load, add fade-in to sections
  sections.forEach(section => section.classList.add('fade-in'));
});

// Fade in sections when scrolled into view
const fadeSections = document.querySelectorAll('.fade-section');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

fadeSections.forEach(section => {
  fadeObserver.observe(section);
});