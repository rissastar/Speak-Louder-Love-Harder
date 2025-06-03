<script>
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

    // === Add tab switching for mental health disorders ===
    document.querySelectorAll('.tab-buttons').forEach(buttonGroup => {
      buttonGroup.addEventListener('click', (e) => {
        if (!e.target.classList.contains('tab-btn')) return;

        const btns = buttonGroup.querySelectorAll('.tab-btn');
        const tabs = buttonGroup.parentElement.querySelectorAll('.tab-content');

        btns.forEach(btn => btn.classList.remove('active'));
        tabs.forEach(tab => tab.classList.remove('active'));

        e.target.classList.add('active');
        const tabId = e.target.getAttribute('data-tab');
        const activeTab = buttonGroup.parentElement.querySelector(`#${tabId}`);
        if (activeTab) activeTab.classList.add('active');
      });
    });

    // If you want to keep the dark mode toggle with a different button ID ('dark-mode-toggle'),
    // you can remove it because you already have themeToggle here handling the mode switch.

    // Optional: you can add any other listeners you want here, e.g., audio, sparkles, etc.
  });
</script>