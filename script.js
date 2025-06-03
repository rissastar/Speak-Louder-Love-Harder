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

  // Audio play/pause toggle
  audioBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play();
      audioBtn.textContent = '🔊 Pause Audio';
    } else {
      bgMusic.pause();
      audioBtn.textContent = '🔈 Play Audio';
    }
  });

  // Sparkle toggle button
  sparkleToggleBtn.addEventListener('click', () => {
    sparklesEnabled = !sparklesEnabled;
    sparkleToggleBtn.classList.toggle('active', sparklesEnabled);
    sparkleToggleBtn.setAttribute('aria-pressed', sparklesEnabled);
    sparkleToggleBtn.textContent = sparklesEnabled ? '✨ Sparkles On' : '❌ Sparkles Off';
  });

  // Sparkle button click to emit sparkles at button position
  sparkleButton.addEventListener('click', () => {
    if (!sparklesEnabled) return;
    party.sparkles(sparkleButton, {
      count: 30,
      size: party.variation.range(5, 15),
      speed: party.variation.range(100, 300),
      shapes: ['star', 'circle'],
      spread: 30,
      color: ['#bb33ff', '#ff33cc', '#33ff99', '#a0f2a0']
    });
  });

  // Optional: Sparkle button keyboard support
  sparkleButton.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && sparklesEnabled) {
      e.preventDefault();
      sparkleButton.click();
    }
  });
});