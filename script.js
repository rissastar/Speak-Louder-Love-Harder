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

// Sparkle emitter with rotation, burst & trail
function emitSparkles() {
  if (!sparklesEnabled) return;

  const sparkleCount = 30; // more sparkles

  for (let i = 0; i < sparkleCount; i++) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');

    // Random color from palette
    const colors = ['#A259FF', '#FF6EC7', '#00FF85'];
    sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    // Random position inside sparkle button
    const rect = sparkleBtn.getBoundingClientRect();
    sparkle.style.left = `${Math.random() * rect.width}px`;
    sparkle.style.top = `${Math.random() * rect.height}px`;

    // Random size
    const size = Math.random() * 8 + 6;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;

    // Random animation duration (float + rotate + pulse)
    const duration = 1 + Math.random() * 1.3;
    sparkle.style.setProperty('--duration', `${duration}s`);

    // Add burst scale effect on spawn
    sparkle.animate(
      [
        { transform: 'scale(0)', opacity: 1 },
        { transform: 'scale(1.3)', opacity: 1 },
        { transform: 'scale(1)', opacity: 1 },
      ],
      { duration: 400, easing: 'ease-out' }
    );

    sparkleBtn.appendChild(sparkle);

    // Trail effect: create tiny fading dots behind sparkle
    createTrail(sparkle);

    // Remove sparkle after animation
    setTimeout(() => {
      sparkle.remove();
    }, duration * 1000);
  }
}

function createTrail(sparkle) {
  const trailCount = 3;
  const sparkleRect = sparkle.getBoundingClientRect();
  for (let i = 0; i < trailCount; i++) {
    const trailDot = document.createElement('div');
    trailDot.classList.add('sparkle');
    trailDot.style.backgroundColor = sparkle.style.backgroundColor;
    trailDot.style.width = trailDot.style.height = '3px';
    trailDot.style.left = sparkle.style.left;
    trailDot.style.top = sparkle.style.top;
    trailDot.style.opacity = 0.5 - i * 0.15;
    trailDot.style.animationDuration = '0.5s';
    trailDot.style.animationName = 'trailFade';
    sparkleBtn.appendChild(trailDot);

    setTimeout(() => trailDot.remove(), 500);
  }
}

sparkleBtn.addEventListener('click', () => {
  emitSparkles();
});

// Sparkle burst on sparkle button hover (tiny sparkles)
sparkleBtn.addEventListener('mouseenter', () => {
  if (!sparklesEnabled) return;
  for (let i = 0; i < 6; i++) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    const colors = ['#A259FF', '#FF6EC7', '#00FF85'];
    sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    const rect = sparkleBtn.getBoundingClientRect();
    sparkle.style.left = `${Math.random() * rect.width}px`;
    sparkle.style.top = `${Math.random() * rect.height}px`;
    const size = Math.random() * 6 + 3;
    sparkle.style.width = sparkle.style.height = `${size}px`;
    sparkle.style.setProperty('--duration', '1s');

    sparkleBtn.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  }
});

// Audio controls
audioBtn.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play();
    audioBtn.textContent = '🔊 Mute Audio';
    audioBtn.classList.add('playing');
  } else {
    bgMusic.pause();
    audioBtn.textContent = '🔈 Play Audio';
    audioBtn.classList.remove('playing');
  }
});

// Fade in animations for sections on load
window.addEventListener('load', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    section.style.animationDelay = `${index * 0.4}s`;
    section.classList.add('fade-out');
  });
  
  @keyframes trailFade {
  0% {
    opacity: 0.5;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-15px) scale(0.7);
  }
}