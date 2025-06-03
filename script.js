// Smooth Section Highlighting on Scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll('nav a').forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// Optional: Fade-in animations on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-visible');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.fade-in').forEach(element => {
  observer.observe(element);
});

// Example: Mobile menu toggle (optional, use if adding a hamburger icon later)
document.querySelectorAll('.menu-toggle')?.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('open');
  });
  
  // Theme toggle logic
const themeToggleBtn = document.querySelector('#theme-toggle button');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'light') {
  document.body.classList.add('light-theme');
}

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
  localStorage.setItem('theme', theme);
});

// Enhanced Theme Initialization and Toggle
const themeBtn = document.querySelector('#theme-toggle button');

// Initial setup
const storedTheme = localStorage.getItem('theme');
const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

if (storedTheme === 'light' || (!storedTheme && systemPrefersLight)) {
  document.body.classList.add('light-theme');
  switchThemeImages('light');
} else {
  switchThemeImages('dark');
}

// Toggle handler
themeBtn.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light-theme');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  switchThemeImages(isLight ? 'light' : 'dark');
});

// Optional: Image/logo switcher
function switchThemeImages(theme) {
  document.querySelectorAll('[data-theme-src]').forEach(img => {
    const src = img.getAttribute(`data-src-${theme}`);
    if (src) img.src = src;
  });
  const themeBtn = document.getElementById('theme-btn');
const storedTheme = localStorage.getItem('theme');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

// Init theme
if (storedTheme === 'light' || (!storedTheme && prefersLight)) {
  document.body.classList.add('light-theme');
  switchThemeImages('light');
} else {
  switchThemeImages('dark');
}

// Toggle logic
themeBtn.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light-theme');
  const theme = isLight ? 'light' : 'dark';
  localStorage.setItem('theme', theme);
  switchThemeImages(theme);
});

// Swap images based on theme
function switchThemeImages(theme) {
  document.querySelectorAll('[data-theme-src]').forEach(img => {
    const src = img.getAttribute(`data-src-${theme}`);
    if (src) img.src = src;
  });
}
});