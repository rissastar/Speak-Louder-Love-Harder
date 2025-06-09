// Toggle Dark Mode with persistence
const btn = document.querySelector('.toggle-dark');
const body = document.body;

function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    body.classList.add('dark');
    btn.textContent = '☀️ Light Mode';
  } else {
    body.classList.remove('dark');
    btn.textContent = '🌙 Dark Mode';
  }
}

function toggleDarkMode() {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  btn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
}

// Initialize on page load
btn.addEventListener('click', toggleDarkMode);
initTheme();