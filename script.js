// 🌗 Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', currentTheme);

themeBtn.addEventListener('click', () => {
  const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// 🎉 Party Sparkles
document.getElementById('sparkle-button')?.addEventListener('click', (event) => {
  party.confetti(event.target, {
    count: party.variation.range(20, 40),
    size: party.variation.range(0.6, 1.2),
    spread: 90,
  });
});