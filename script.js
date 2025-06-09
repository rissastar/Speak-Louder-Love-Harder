// Toggle dark mode on/off
function toggleDarkMode() {
  const body = document.body;
  const toggleBtn = document.querySelector('.toggle-dark');
  
  // Toggle dark class on body
  const isDark = body.classList.toggle('dark');
  
  // Update button icon and text
  toggleBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  
  // Save preference to localStorage
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  
  // Animate button with bounce effect
  toggleBtn.classList.add('bounce');
  setTimeout(() => toggleBtn.classList.remove('bounce'), 300);
  
  // Show toast message
  showToast(isDark ? '🌙 Dark mode enabled' : '☀️ Light mode enabled');
}

// Show a temporary toast message at bottom center
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  // Remove toast after delay with fade-out effect
  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 500);
  }, 2000);
}

// On page load, apply saved theme preference and update button text
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const toggleBtn = document.querySelector('.toggle-dark');
  
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    toggleBtn.textContent = '☀️ Light Mode';
  } else {
    toggleBtn.textContent = '🌙 Dark Mode';
  }
});