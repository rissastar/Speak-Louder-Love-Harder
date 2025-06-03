// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  const audioBtn = document.getElementById('audio-btn');
  const bgMusic = document.getElementById('bg-music');

  const sparkleToggleBtn = document.getElementById('sparkle-btn');
  const sparkleButton = document.getElementById('sparkle-button');

  let sparklesEnabled = true;

  // Load theme from localStorage or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  // Theme toggle handler
  themeToggle.addEventListener('click', () => {
    const newTheme = body.classList.contains('light-theme') ? 'dark' : 'light';
    setTheme(newTheme);
  });

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
      themeToggle.textContent = '🌙'; // Moon icon for light theme to switch back to dark
    } else {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
      themeToggle.textContent = '🌓'; // Sun/moon icon for dark theme
    }
    localStorage.setItem('theme', theme);
  }