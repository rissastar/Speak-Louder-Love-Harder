// Elements
const themeToggle = document.getElementById('theme-toggle');
const sparkleBtn = document.getElementById('sparkle-button');
const sparkleToggleBtn = document.getElementById('sparkle-btn');
const audioBtn = document.getElementById('audio-btn');
const bgMusic = document.getElementById('bg-music');

let sparklesEnabled = true;

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Sparkle toggle
sparkleToggleBtn.addEventListener('click', () => {
  sparklesEnabled = !sparklesEnabled;
  sparkleToggleBtn.textContent = sparklesEnabled ? '✨ Sparkles On' : '✨ Sparkles Off';
  sparkleToggleBtn.classList.toggle('active', sparklesEnabled);
});

// Sparkle emitter function
function emitSparkles() {
  if (!sparklesEnabled) return;

  const sparkleCount = 25;
  for (let i = 0; i < sparkleCount; i++) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');

    // Random color
    const colors = ['#A259FF', '#FF6EC7', '#00FF85'];
    sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    // Position inside sparkle button
    const rect = sparkleBtn.getBoundingClientRect();
    sparkle.style.left = `${Math.random() * rect.width}px`;
    sparkle.style.top = `${Math.random() * rect.height}px`;

    // Size and animation duration
    const size = Math.random() * 6 + 4;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.animationDuration = `${Math.random() * 1 + 1.5}s`;

    sparkleBtn.appendChild(sparkle);

    sparkle.addEventListener('animationend', () => {
      sparkle.remove();
    });
  }
}

// Sparkle button click animation
sparkleBtn.addEventListener('click', () => {
  emitSparkles();
  sparkleBtn.animate([
    { transform: 'scale(1)' },
    { transform: 'scale(1.3)' },
    { transform: 'scale(1)' }
  ], {
    duration: 350,
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
  });
});

// Audio control
audioBtn.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play();
    audioBtn.textContent = '🔊 Pause';
    audioBtn.classList.add('playing');

    // Glow pulse animation using Web Animations API
    audioBtn._animation = audioBtn.animate([
      { boxShadow: '0 0 10px 4px #e91e63cc' },
      { boxShadow: '0 0 25px 8px #e91e63dd' },
      { boxShadow: '0 0 10px 4px #e91e63cc' }
    ], { duration: 1500, iterations: Infinity, easing: 'ease-in-out' });
  } else {
    bgMusic.pause();
    audioBtn.textContent = '🔈 Play';
    audioBtn.classList.remove('playing');

    // Cancel glow animation
    if (audioBtn._animation) {
      audioBtn._animation.cancel();
    }
  }
});