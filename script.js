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

  // AUDIO BUTTON (example - toggle play/pause)
  audioBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play();
      audioBtn.textContent = '🔊';
    } else {
      bgMusic.pause();
      audioBtn.textContent = '🔈';
    }
  });

  // SPARKLE BUTTON (example toggle)
  sparkleToggleBtn.addEventListener('click', () => {
    sparklesEnabled = !sparklesEnabled;
    sparkleButton.style.display = sparklesEnabled ? 'inline-block' : 'none';
    sparkleToggleBtn.textContent = sparklesEnabled ? 'Disable Sparkles' : 'Enable Sparkles';
  });

  // --- TAB FADE IN/OUT LOGIC ---

  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.target;
      const targetContent = document.getElementById(targetId);

      const currentActive = document.querySelector('.tab-content.active');

      if (currentActive && currentActive !== targetContent) {
        currentActive.style.opacity = '0';

        currentActive.addEventListener('transitionend', function handler() {
          currentActive.classList.remove('active');
          currentActive.style.opacity = '';
          currentActive.style.visibility = '';
          currentActive.style.maxHeight = '';
          currentActive.style.padding = '';
          currentActive.removeEventListener('transitionend', handler);
        });
      }

      if (!targetContent.classList.contains('active')) {
        targetContent.classList.add('active');
        void targetContent.offsetWidth; // trigger reflow
        targetContent.style.opacity = '1';
      }

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
});