// Theme toggler: saves user preference in localStorage
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(dark) {
  if (dark) {
    body.classList.add('dark');
    toggleBtn.textContent = '☀️';
  } else {
    body.classList.remove('dark');
    toggleBtn.textContent = '🌙';
  }
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

// Load theme from localStorage or system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme === 'dark');
} else {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(prefersDark);
}

// Toggle on button click
toggleBtn.addEventListener('click', () => {
  const isDark = body.classList.contains('dark');
  setTheme(!isDark);
});