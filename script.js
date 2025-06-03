// 🌗 Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', currentTheme);

// Toggle theme with pulse animation feedback
themeBtn.addEventListener('click', () => {
  const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  themeBtn.classList.add('pulse');
  setTimeout(() => themeBtn.classList.remove('pulse'), 600);
});

// Live update if system preference changes and user hasn't set preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if(!localStorage.getItem('theme')) {
    document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
  }
});

// 🎉 Party Sparkles
document.getElementById('sparkle-button')?.addEventListener('click', (event) => {
  party.confetti(event.target, {
    count: party.variation.range(20, 40),
    size: party.variation.range(0.6, 1.2),
    spread: 90,
  });
});

// Sticky Nav Bar on Scroll
const nav = document.querySelector('nav');
const header = document.querySelector('header');
const stickyOffset = header.offsetHeight;

// Back to top button setup
const backToTopBtn = document.createElement('button');
backToTopBtn.id = 'back-to-top';
backToTopBtn.title = 'Back to Top';
backToTopBtn.textContent = '⬆️';
document.body.appendChild(backToTopBtn);
backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

window.addEventListener('scroll', () => {
  // Sticky nav
  if(window.pageYOffset > stickyOffset) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }

  // Show/hide back to top
  if(window.pageYOffset > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

// Fade in sections with stagger on scroll
const faders = document.querySelectorAll('.fade-out');
const appearOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.target.style.setProperty('--delay', `${entry.target.dataset.delay || 0}s`);
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach((fader, i) => {
  fader.dataset.delay = (i * 0.2).toFixed(2);
  appearOnScroll.observe(fader);
});

// 🔈 Audio controls
const bgMusic = document.getElementById('bg-music');
const audioBtn = document.getElementById('audio-btn');
const audioVolume = document.createElement('input');
audioVolume.type = 'range';
audioVolume.min = 0;
audioVolume.max = 1;
audioVolume.step = 0.01;
audioVolume.value = 0.5;
audioVolume.id = 'audio-volume';
document.body.appendChild(audioVolume);

// Play/pause background music
audioBtn.addEventListener('click', () => {
  if(bgMusic.paused) {
    bgMusic.play();
    audioBtn.textContent = '🔊 Pause';
  } else {
    bgMusic.pause();
    audioBtn.textContent = '🔈 Play';
  }
});

// Volume control
audioVolume.value = bgMusic.volume;
audioVolume.addEventListener('input', e => {
  bgMusic.volume = e.target.value;
});

// 🎨 Reset Theme Preference Button
const resetThemeBtn = document.createElement('button');
resetThemeBtn.id = 'reset-theme-btn';
resetThemeBtn.textContent = 'Reset Theme';
document.body.appendChild(resetThemeBtn);
resetThemeBtn.addEventListener('click', () => {
  localStorage.removeItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
});