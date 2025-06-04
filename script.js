// ===== Helper: Save/Load to localStorage =====
const storageKeyTheme = 'sllh-theme';
const storageKeyColorTheme = 'sllh-color-theme';

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

function loadFromStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

// ===== Scroll Reveal Animation =====
function handleScrollReveal() {
  document.querySelectorAll('[data-scroll-animate]').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('in-view');
    }
  });
}
window.addEventListener('scroll', handleScrollReveal);
window.addEventListener('load', handleScrollReveal);

// ===== Theme & Color Theme =====
const htmlEl = document.documentElement;
const themeToggleBtn = document.getElementById('theme-toggle');
const colorThemeSelector = document.getElementById('color-theme-selector');

function applyTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  if (themeToggleBtn) {
    themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
  saveToStorage(storageKeyTheme, theme);
}

function applyColorTheme(color) {
  htmlEl.setAttribute('data-color-theme', color);
  saveToStorage(storageKeyColorTheme, color);
}

function toggleTheme() {
  const current = htmlEl.getAttribute('data-theme') || 'light';
  applyTheme(current === 'light' ? 'dark' : 'light');
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', toggleTheme);
}

if (colorThemeSelector) {
  colorThemeSelector.addEventListener('change', e => {
    applyColorTheme(e.target.value);
  });
}

// Load stored preferences
applyTheme(loadFromStorage(storageKeyTheme) || 'light');
const savedColor = loadFromStorage(storageKeyColorTheme) || 'default';
applyColorTheme(savedColor);
if (colorThemeSelector) colorThemeSelector.value = savedColor;

// ===== Scroll to Top Button =====
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
  if (scrollToTopBtn) {
    scrollToTopBtn.classList.toggle('show', window.scrollY > 300);
  }
});

if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== Custom Cursor =====
const customCursor = document.getElementById('custom-cursor');

window.addEventListener('mousemove', e => {
  if (customCursor) {
    customCursor.style.top = `${e.clientY}px`;
    customCursor.style.left = `${e.clientX}px`;
  }
});

document.querySelectorAll('a').forEach(link => {
  link.addEventListener('mouseenter', () => {
    if (customCursor) {
      customCursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      customCursor.style.backgroundColor = getComputedStyle(htmlEl).getPropertyValue('--primary');
    }
  });
  link.addEventListener('mouseleave', () => {
    if (customCursor) {
      customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
      customCursor.style.backgroundColor = 'transparent';
    }
  });
});

// ===== Quote Rotator =====
const quotes = [
  "Healing begins when we choose to speak up.",
  "You are stronger than your silence.",
  "Every story matters. Especially yours.",
  "Compassion is louder than judgment.",
  "Let your voice be the light for someone else.",
  "Courage means sharing your truth anyway."
];

const quoteBox = document.getElementById('quote-rotator');
let quoteIndex = 0;

function showNextQuote() {
  if (!quoteBox) return;
  quoteBox.classList.remove('visible');
  setTimeout(() => {
    quoteBox.textContent = quotes[quoteIndex];
    quoteBox.classList.add('visible');
    quoteIndex = (quoteIndex + 1) % quotes.length;
  }, 400);
}

setInterval(showNextQuote, 5000);
window.addEventListener('load', showNextQuote);

// ===== Daily Affirmation =====
const affirmations = [
  "I am worthy of love and kindness.",
  "My story matters and inspires others.",
  "I choose healing and growth every day.",
  "I am stronger than my struggles.",
  "Hope guides me forward.",
  "I deserve peace and happiness.",
  "Every day is a new beginning."
];

const affirmationBox = document.getElementById('affirmation-box');
const newAffirmBtn = document.getElementById('new-affirmation');

function showNewAffirmation() {
  if (!affirmationBox) return;
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * affirmations.length);
  } while (affirmations[newIndex] === affirmationBox.textContent);
  affirmationBox.textContent = affirmations[newIndex];
  // Confetti burst
  const rect = newAffirmBtn.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2 + window.scrollY;
  createConfettiBurst(x, y);
}

if (newAffirmBtn) {
  newAffirmBtn.addEventListener('click', showNewAffirmation);
}

// ===== Scroll-triggered Animation =====
function onScroll() {
  const triggerBottom = window.innerHeight * 0.85;
  document.querySelectorAll('[data-scroll-animate]').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', onScroll);
window.addEventListener('load', onScroll);

// ===== Confetti Burst =====
const confettiCanvas = document.getElementById('confetti-canvas');
const ctx = confettiCanvas?.getContext('2d');
let confettiParticles = [];

function resizeCanvas() {
  if (!confettiCanvas) return;
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createConfettiBurst(x, y) {
  if (!ctx) return;
  const colors = ['#ff69b4', '#00ffcc', '#ffcc00', '#9966ff', '#66ff66'];
  for (let i = 0; i < 50; i++) {
    confettiParticles.push({
      x,
      y,
      radius: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      dx: Math.random() * 6 - 3,
      dy: Math.random() * -5 - 1,
      life: 100
    });
  }
}

function updateConfetti() {
  if (!ctx || !confettiCanvas) return;
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  confettiParticles.forEach((p, index) => {
    p.x += p.dx;
    p.y += p.dy;
    p.dy += 0.2;
    p.life--;

    if (p.life <= 0) {
      confettiParticles.splice(index, 1);
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
  });

  requestAnimationFrame(updateConfetti);
}
updateConfetti();

// ===== Typing Effect for Hero Section =====
const heroText = "Your Voice Matters. Your Story Heals. 💜";
const typewriterEl = document.getElementById('hero-typewriter');
let i = 0;

function typeWriter() {
  if (!typewriterEl) return;
  if (i < heroText.length) {
    typewriterEl.textContent = heroText.substring(0, i + 1) + '|';
    i++;
    setTimeout(typeWriter, 60);
  } else {
    typewriterEl.textContent = heroText;
  }
}
window.addEventListener('load', typeWriter);

// ===== Sound Effects =====
const clickSound = document.getElementById('click-sound');
const sparkleSound = document.getElementById('sparkle-sound');

function playSound(audio) {
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
}

document.querySelectorAll('button, .magic-link').forEach(el => {
  el.addEventListener('click', () => playSound(clickSound));
});

if (newAffirmBtn) {
  newAffirmBtn.addEventListener('click', () => playSound(sparkleSound));
}