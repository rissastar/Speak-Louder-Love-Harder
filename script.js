// Scripts for Speak Louder, Love Harder 🌟
// Features: Dark/light toggle, hamburger menu, quote rotator, guestbook form, scroll animations, scroll progress, particles, smooth scrolling, and nav highlight

document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('primary-menu');
  const quoteEl = document.getElementById('quote');
  const guestbookForm = document.getElementById('guestbook-form');
  const guestbookEntries = document.getElementById('guestbook-entries');
  const scrollProgressBar = document.getElementById('scroll-progress');
  const fadeSlideElements = document.querySelectorAll('.fade-slide');

  // --- Dark/Light Mode with localStorage ---
  function setTheme(theme) {
    if (theme === 'dark') {
      body.classList.add('dark-mode');
      themeToggleBtn.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-mode');
      themeToggleBtn.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  }

  // Init theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    // Default to system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

  // --- Hamburger menu toggle ---
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('open');

    // Update aria-expanded for accessibility
    const expanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', expanded);
  });

  // --- Smooth scrolling and active nav link highlighting ---
  const navLinks = [...navLinksContainer.querySelectorAll('a.magic-link')];
  const sectionIds = navLinks
    .map((a) => a.getAttribute('href'))
    .filter((href) => href.startsWith('#') || href.endsWith('.html'));

  // Since your nav links go to other pages, highlight on current page only for internal anchors
  // We'll implement a basic active highlight based on location.pathname matching filename

  function updateActiveLink() {
    const currentPage = window.location.pathname.split('/').pop();
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('active-link');
      } else {
        link.classList.remove('active-link');
      }
    });
  }
  updateActiveLink();

  // --- Quote Rotator ---
  const quotes = [
    "“Mental health is not a destination, but a process. It's about how you drive, not where you're going.” – Noam Shpancer",
    "“The wound is the place where the Light enters you.” – Rumi",
    "“You are stronger than you know.” – Unknown",
    "“Healing takes time, and asking for help is a courageous step.” – Unknown",
    "“Love recognizes no barriers.” – Maya Angelou",
    "“What lies behind us and what lies before us are tiny matters compared to what lies within us.” – Ralph Waldo Emerson"
  ];

  let quoteIndex = 0;

  function showNextQuote() {
    quoteEl.textContent = quotes[quoteIndex];
    quoteIndex = (quoteIndex + 1) % quotes.length;
  }

  showNextQuote();
  setInterval(showNextQuote, 8000);

  // --- Guestbook Form Submission ---
  // Use localStorage to persist guestbook entries (demo only)
  function loadGuestbookEntries() {
    const storedEntries = JSON.parse(localStorage.getItem('guestbookEntries') || '[]');
    guestbookEntries.innerHTML = '';
    storedEntries.forEach(({name, message}) => addEntryToDOM(name, message));
  }

  function addEntryToDOM(name, message) {
    const li = document.createElement('li');
    li.innerHTML = `<span class="name">${sanitizeHTML(name)}</span>: ${sanitizeHTML(message)}`;
    guestbookEntries.appendChild(li);
  }

  guestbookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = guestbookForm.name.value.trim();
    const message = guestbookForm.message.value.trim();
    if (!name || !message) return;

    // Save entry in localStorage
    const storedEntries = JSON.parse(localStorage.getItem('guestbookEntries') || '[]');
    storedEntries.push({ name, message });
    localStorage.setItem('guestbookEntries', JSON.stringify(storedEntries));

    addEntryToDOM(name, message);
    guestbookForm.reset();
  });

  loadGuestbookEntries();

  // Simple HTML sanitizer to prevent injection
  function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // --- Scroll progress bar ---
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgressBar.style.width = scrollPercent + '%';

    // Show/hide scroll progress bar on scroll
    if (scrollTop > 50) {
      scrollProgressBar.style.opacity = '1';
    } else {
      scrollProgressBar.style.opacity = '0';
    }

    // Fade-slide sections reveal
    fadeSlideElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        el.classList.add('visible');
      }
    });
  });

  // --- Particle background ---
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particlesArray = [];
  const maxParticles = 60;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = 2 + Math.random() * 3;
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.speedY = (Math.random() - 0.5) * 0.6;
      this.opacity = 0.5 + Math.random() * 0.5;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 72, 153, ${this.opacity})`;
      ctx.shadowColor = 'rgba(255, 72, 153, 0.7)';
      ctx.shadowBlur = 8;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    particlesArray = [];
    for (let i = 0; i < maxParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();

  // --- Scroll-responsive header resizing ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('small-header');
    } else {
      header.classList.remove('small-header');
    }
  });

  // --- Accessibility enhancements ---
  // Keyboard navigation for hamburger menu
  hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      hamburger.click();
    }
  });
});