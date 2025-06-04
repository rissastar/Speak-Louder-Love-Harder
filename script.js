// ===== Helper: Save/Load to localStorage =====
const storageKeyTheme = 'sllh-theme';
const storageKeyColorTheme = 'sllh-color-theme';

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // localStorage unavailable
  }
}

function loadFromStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

// ===== Scroll Reveal Animation =====
const scrollElements = document.querySelectorAll('[data-scroll-animate]');

function handleScrollReveal() {
  scrollElements.forEach(el => {
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
  themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  saveToStorage(storageKeyTheme, theme);
}

function applyColorTheme(color) {
  htmlEl.setAttribute('data-color-theme', color);
  saveToStorage(storageKeyColorTheme, color);
}

function toggleTheme() {
  const currentTheme = htmlEl.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
}

themeToggleBtn.addEventListener('click', toggleTheme);

colorThemeSelector.addEventListener('change', e => {
  applyColorTheme(e.target.value);
});

// Load saved preferences on startup
const savedTheme = loadFromStorage(storageKeyTheme) || 'light';
const savedColorTheme = loadFromStorage(storageKeyColorTheme) || 'default';

applyTheme(savedTheme);
applyColorTheme(savedColorTheme);
colorThemeSelector.value = savedColorTheme;

// ===== Scroll to Top Button =====
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Custom Cursor =====
const customCursor = document.getElementById('custom-cursor');

window.addEventListener('mousemove', e => {
  customCursor.style.top = e.clientY + 'px';
  customCursor.style.left = e.clientX + 'px';
});

// Scale cursor on hovering links
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('mouseenter', () => {
    customCursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    customCursor.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--primary');
  });
  link.addEventListener('mouseleave', () => {
    customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
    customCursor.style.backgroundColor = 'transparent';
  });
});

// ===== Quote Rotator =====
const quotes = [
  "Healing begins when we choose to speak up.",
  "Your voice matters more than you know.",
  "Every story shared is a step toward justice.",
  "Hope is a light we carry together.",
  "Love harder, speak louder, shine brighter.",
  "Strength grows through sharing your truth.",
  "Together we heal, together we rise."
];

const quoteRotatorEl = document.getElementById('quote-rotator');
let currentQuoteIndex = 0;

function rotateQuote() {
  currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
  quoteRotatorEl.textContent = quotes[currentQuoteIndex];
}

setInterval(rotateQuote, 8000);

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
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * affirmations.length);
  } while (affirmations[newIndex] === affirmationBox.textContent);

  affirmationBox.textContent = affirmations[newIndex];
}

newAffirmBtn.addEventListener('click', showNewAffirmation);

// ===== Scroll-triggered Animation =====
const scrollAnimateEls = document.querySelectorAll('[data-scroll-animate]');

function onScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  scrollAnimateEls.forEach(el => {
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
const ctx = confettiCanvas.getContext('2d');
let confettiParticles = [];

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createConfettiBurst(x, y) {
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
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  confettiParticles.forEach((p, index) => {
    p.x += p.dx;
    p.y += p.dy;
    p.dy += 0.2; // gravity
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

newAffirmBtn.addEventListener('click', e => {
  const rect = newAffirmBtn.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2 + window.scrollY;
  createConfettiBurst(centerX, centerY);
});

// ===== Typing Effect for Hero Section =====
const heroText = "Your Voice Matters. Your Story Heals. 💜";
const typewriterEl = document.getElementById('hero-typewriter');

let i = 0;
function typeWriter() {
  if (i < heroText.length) {
    typewriterEl.textContent = heroText.substring(0, i + 1) + '|';
    i++;
    setTimeout(typeWriter, 60);
  } else {
    typewriterEl.textContent = heroText;
  }
}

window.addEventListener('load', typeWriter);

// Sound effects
const clickSound = document.getElementById('click-sound');
const sparkleSound = document.getElementById('sparkle-sound');

function playSound(audio) {
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
}

// Attach to buttons and links
document.querySelectorAll('button, .magic-link').forEach(el => {
  el.addEventListener('click', () => playSound(clickSound));
});

// Use sparkle sound for special buttons
document.getElementById('new-affirmation')?.addEventListener('click', () => {
  playSound(sparkleSound);
});