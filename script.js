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
  const typedText = document.getElementById('typed-text');

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
    if (colorSelector) colorSelector.value = color;
  }

  function loadThemeSettings() {
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const savedColor = localStorage.getItem('color-theme') || 'default';
    setTheme(savedTheme);
    setColorTheme(savedColor);
  }

  // ===== Scroll to Top =====
  function handleScroll() {
    if (window.scrollY > 300) scrollTopBtn?.classList.add('show');
    else scrollTopBtn?.classList.remove('show');
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
    if (affirmationBox) affirmationBox.textContent = random;
  }

  // ===== Typing Effect =====
  const phrases = [
    "Speak Louder, Love Harder 🌟",
    "Your Voice Matters 💬",
    "Advocate. Heal. Empower. 💖",
    "Together, We Rise 🌈"
  ];
  let currentPhrase = 0;
  let currentChar = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!typedText) return;
    const current = phrases[currentPhrase];
    if (isDeleting) {
      currentChar--;
      if (currentChar === 0) {
        isDeleting = false;
        currentPhrase = (currentPhrase + 1) % phrases.length;
      }
    } else {
      currentChar++;
      if (currentChar === current.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1500);
        return;
      }
    }

    typedText.textContent = current.slice(0, currentChar);
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
  }

  // ===== Particle Background =====
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas?.getContext('2d');
  let particlesArray = [];

  function initParticles() {
    if (!canvas || !ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesArray = [];
    for (let i = 0; i < 100; i++) {
      particlesArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
      });
    }
  }

  function handleParticles() {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.fill();
    });
    requestAnimationFrame(handleParticles);
  }

  // ===== Initialize =====
  loadThemeSettings();
  rotateQuotes();
  typeEffect();
  initParticles();
  handleParticles();

  // Event Listeners
  themeToggle?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(current);
  });

  colorSelector?.addEventListener('change', (e) => {
    setColorTheme(e.target.value);
  });

  inlineColorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.dataset.color;
      setColorTheme(color);
    });
  });

  window.addEventListener('scroll', handleScroll);
  scrollTopBtn?.addEventListener('click', scrollToTop);
  window.addEventListener('mousemove', moveCursor);
  setInterval(rotateQuotes, 6000);
  affirmationBtn?.addEventListener('click', showRandomAffirmation);
  window.addEventListener('resize', initParticles);
});