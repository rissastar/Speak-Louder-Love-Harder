// Theme toggle (light/dark)
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(prefersDark ? 'dark' : 'light');
}

themeToggle.addEventListener('click', () => {
  if (body.classList.contains('dark')) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
});

themeToggle.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    themeToggle.click();
  }
});

// Sparkle effect with party.js
const sparkleBtn = document.getElementById('sparkle-button');
const sparkleToggleBtn = document.getElementById('sparkle-btn');
let sparklesEnabled = true;

function emitSparkles() {
  if (!sparklesEnabled) return;
  party.sparkles(sparkleBtn, {
    count: party.variation.range(12, 20),
    spread: 50,
  });
  // Add a quick "pop" scale animation on the button
  sparkleBtn.animate([
    { transform: 'scale(1)' },
    { transform: 'scale(1.25)' },
    { transform: 'scale(1)' }
  ], {
    duration: 300,
    easing: 'ease-out'
  });
}

sparkleBtn.addEventListener('click', () => {
  emitSparkles();
});

// Toggle sparkles on/off with style feedback
sparkleToggleBtn.addEventListener('click', () => {
  sparklesEnabled = !sparklesEnabled;
  sparkleToggleBtn.textContent = sparklesEnabled ? '✨ Sparkles On' : '❌ Sparkles Off';
  sparkleToggleBtn.classList.toggle('active', sparklesEnabled);
  // Animate toggle button pulse
  sparkleToggleBtn.animate([
    { transform: 'scale(1)' },
    { transform: 'scale(1.1)' },
    { transform: 'scale(1)' }
  ], { duration: 200, easing: 'ease-in-out' });
});

// Audio control with button glow and text changes
const audioBtn = document.getElementById('audio-btn');
const bgMusic = document.getElementById('bg-music');

audioBtn.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play();
    audioBtn.textContent = '🔊 Pause';
    audioBtn.classList.add('playing');
    // Add pulse glow on play
    audioBtn.animate([
      { boxShadow: '0 0 10px 4px #e91e63cc' },
      { boxShadow: '0 0 25px 8px #e91e63dd' },
      { boxShadow: '0 0 10px 4px #e91e63cc' }
    ], { duration: 1500, iterations: Infinity });
  } else {
    bgMusic.pause();
    audioBtn.textContent = '🔈 Play';
    audioBtn.classList.remove('playing');
    audioBtn.getAnimations().forEach(anim => anim.cancel());
  }
});

bgMusic.addEventListener('ended', () => {
  audioBtn.textContent = '🔈 Play';
  audioBtn.classList.remove('playing');
  audioBtn.getAnimations().forEach(anim => anim.cancel());
});