// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('theme-toggle');
  const body = document.body;

  const toggleTheme = () => {
    body.classList.toggle('light-theme');
  };

  toggle.addEventListener('click', toggleTheme);
  toggle.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      toggleTheme();
    }
  });
});