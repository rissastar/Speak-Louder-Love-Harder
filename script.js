document.addEventListener('DOMContentLoaded', () => {
  // ===== Elements =====
  const root = document.documentElement;
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const colorSelector = document.getElementById('color-theme-selector');
  const scrollTopBtn = document.getElementById('scroll-to-top');
  const customCursor = document.getElementById('custom-cursor');
  const quoteBox = document.getElementById('quote-box');
  const affirmationBtn = document.getElementById('new-affirmation');
  const affirmationBox = document.getElementById('affirmation-box');
  const inlineColorButtons = document.querySelectorAll('.color-theme');

  const colorThemes = ['default', 'green', 'blue', 'red', 'pink'];

  // ===== Theme Functions =====
  function setTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      themeToggle.innerHTML = '☀️';
      themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
      root.removeAttribute('data-theme');
      themeToggle.innerHTML = '🌙';
      themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
    localStorage.setItem('theme', theme);
  }

  function setColorTheme(color) {
    colorThemes.forEach(c => body.classList.remove(`theme-${c}`));
    if (color !== 'default') {
      body.classList.add(`theme-${color}`);
    }
    localStorage.setItem('color-theme', color);

    // If using dropdown selector, sync it
    if (colorSelector) {
      colorSelector.value = color;
    }
  }

  function loadThemeSettings() {
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const savedColor = localStorage.getItem('color-theme') || 'default';
    setTheme(savedTheme);
    setColorTheme(savedColor);
  }

  // ===== Scroll to Top =====
  function handleScroll() {
    if (window.scrollY > 300) {
      scrollTopBtn?.classList.add('show');
    } else {
      scrollTopBtn?.classList.remove('show');
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ===== Custom Cursor =====
  function moveCursor(e) {
    if (!customCursor) return;
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
  }

  // ===== Quote Rotator =====
  const quotes = [
    "“Healing takes time, and asking for help is a courageous step.” — Mariska Hargitay",
    "“There is no greater agony than bearing an untold story inside you.” — Maya Angelou",
    "“Vulnerability is not winning or losing; it’s having the courage to show up.” — Brené Brown",
    "“Every child you encounter is a divine appointment.” — Wess Stafford",
    "“Pit bulls are just dogs. Treat them as individuals.” — BadRap.org",
    "“Stars can’t shine without darkness.” — D.H. Sidebottom"
  ];
  let quoteIndex = 0;
  function rotateQuotes() {
    if (!quoteBox) return;
    quoteBox.textContent = quotes[quoteIndex];
    quoteIndex = (quoteIndex + 1) % quotes.length;
  }

  // ===== Affirmation Generator =====
  const affirmations = [
    "You are enough exactly as you are.",
    "Every day is a fresh start.",
    "You have the power to change your story.",
    "You are not alone in your struggles.",
    "Kindness begins with you.",
    "You are doing your best, and that’s enough.",
    "You are stronger than you know.",
    "Today is a new beginning.",
    "Your feelings are valid.",
    "You are worthy of love and kindness.",
    "Every step forward is progress."
  ];
  function showRandomAffirmation() {
    const random = affirmations[Math.floor(Math.random() * affirmations.length)];
    if (affirmationBox) {
      affirmationBox.textContent = random;
    }
  }

  // ===== Initialize =====
  loadThemeSettings();
  rotateQuotes(); // Show first quote immediately

  // Toggle dark/light theme
  themeToggle?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(current);
  });

  // Dropdown color selector
  colorSelector?.addEventListener('change', (e) => {
    setColorTheme(e.target.value);
  });

  // Inline color buttons (e.g., for palette)
  inlineColorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.dataset.color;
      setColorTheme(color);
    });
  });

  // Scroll to top button
  window.addEventListener('scroll', handleScroll);
  scrollTopBtn?.addEventListener('click', scrollToTop);

  // Custom cursor movement
  window.addEventListener('mousemove', moveCursor);

  // Quote rotator
  setInterval(rotateQuotes, 6000);

  // Affirmation button
  affirmationBtn?.addEventListener('click', showRandomAffirmation);
});