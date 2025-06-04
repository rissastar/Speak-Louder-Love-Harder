function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);

  // Optional: Save preference to localStorage
  localStorage.setItem('preferredTheme', newTheme);
}

// Auto-load preferred theme if previously set
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('preferredTheme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
});