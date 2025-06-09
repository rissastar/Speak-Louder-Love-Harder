// Dark Mode Toggle with localStorage
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  localStorage.setItem('darkMode', isDark);
}

// Initialize dark mode on load
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('darkMode');
  if (saved === 'true') document.body.classList.add('dark');

  // Animate toggle button icon
  const btn = document.querySelector('.toggle-dark');
  btn.addEventListener('mouseover', () => btn.style.transform = 'rotate(20deg)');
  btn.addEventListener('mouseout', () => btn.style.transform = 'rotate(0deg)');

  // Animate share button
  const share = document.querySelector('.share-button');
  share.addEventListener('mouseover', () => share.style.transform = 'scale(1.05)');
  share.addEventListener('mouseout', () => share.style.transform = 'scale(1)');
});