const themeToggle = document.getElementById('theme-toggle');
const sparkleBtn = document.getElementById('sparkle-btn');
const sparkleButton = document.getElementById('sparkle-button');
const audioBtn = document.getElementById('audio-btn');
const bgMusic = document.getElementById('bg-music');

let sparklesEnabled = true;
let darkMode = false;

// THEME TOGGLE
themeToggle.addEventListener('click', () => {
  darkMode = !darkMode;
  if (darkMode) {
    document.body.style.background = 'linear-gradient(135deg, #1e1e2f, #4b007b)';
    themeToggle.textContent = '🌞';
  } else {
    document.body.style.background = 'linear-gradient(135deg, #6b3fa0, #ff6ec7)';
    themeToggle.textContent = '🌓';
  }
});

// SPARKLES TOGGLE
sparkleBtn.addEventListener('click', () => {
  sparklesEnabled = !sparklesEnabled;
  sparkleBtn.classList.toggle('active', sparklesEnabled);
  sparkleBtn.textContent = sparklesEnabled ? '✨ Sparkles On' : '✨ Sparkles Off';
});

// SPARKLE EMIT FUNCTION
function emitSparkles() {
  if (!sparklesEnabled) return;

  for (let i = 0; i < 12; i++) {
    createSparkle();
  }
}

function createSparkle() {
  const sparkle = document.createElement('div');
  sparkle.classList.add('sparkle');

  // Random size between 6-12px
  const size = Math.random() * 6 + 6;
  sparkle.style.width = `${size}px`;
  sparkle.style.height = `${size}px`;

  // Random color from pink, purple, green
  const colors = ['#ff6ec7', '#a259ff', '#4ade80'];
  sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

  // Random position near sparkle button
  const rect = sparkleButton.getBoundingClientRect();
  const x = rect.left + rect.width / 2 + (Math.random() - 0.5) * 60;
  const y = rect.top + rect.height / 2 + (Math.random() - 0.5) * 60;
  sparkle.style.position = 'fixed';
  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;

  // Random animation duration between 0.8-1.5s
  const duration = (Math.random() * 0.7 + 0.8).toFixed(2);
  sparkle.style.setProperty('--duration', `${duration}s`);

  document.body.appendChild(sparkle);

  // Animate sparkle floating up and fading out
  sparkle.animate(
    [
      { opacity: 1, transform: 'translateY(0) scale(1) rotate(0deg)' },
      { opacity: 0, transform: 'translateY(-40px) scale(1.4) rotate(180deg)' }
    ],
    {
      duration: duration * 1000,
      easing: 'ease-out',
      fill: 'forwards',
    }
  );

  // Remove sparkle after animation
  setTimeout(() => sparkle.remove(), duration * 1000);
}

// Sparkle button emits sparkles on click
sparkleButton.addEventListener('click', () => {
  emitSparkles();
});

// AUDIO CONTROL
audioBtn.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play();
    audioBtn.textContent = '🔊 Pause Audio';
    audioBtn.classList.add('active');
  } else {
    bgMusic.pause();
    audioBtn.textContent = '🔈 Play Audio';
    audioBtn.classList.remove('active');
  }
});

// Fade-in for sections
window.addEventListener('load', () => {
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-out');
  });
});