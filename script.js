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

document.getElementById('sparkle-btn')?.addEventListener('click', (event) => {
  party.confetti(event.target, {
    count: party.variation.range(20, 40),
    size: party.variation.range(0.6, 1.2),
    spread: 90,
  });
});

// 🔈 Audio Control
const audioBtn = document.getElementById('audio-btn');
const bgMusic = document.getElementById('bg-music');

audioBtn.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play();
    audioBtn.textContent = '🔊 Pause';
  } else {
    bgMusic.pause();
    audioBtn.textContent = '🔈 Play';
  }
});

// 👣 Scroll Fade-In + Slide-Up Animation for sections
const faders = document.querySelectorAll('.fade-out');

const appearOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// 🧭 Animate nav links on page load (staggered fade + slide)
window.addEventListener('load', () => {
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach((link, index) => {
    link.style.opacity = 0;
    link.style.transform = 'translateY(10px)';
    setTimeout(() => {
      link.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      link.style.opacity = 1;
      link.style.transform = 'translateY(0)';
    }, index * 100);
  });
});