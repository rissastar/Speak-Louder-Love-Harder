// ========== Custom Cursor ==========
const cursor = document.getElementById('custom-cursor');
window.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// ========== Scroll to Top Button ==========
const scrollBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 250) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== Animated Typing Effect for Header ==========
const typingText = 'Speak Louder, Love Harder 🌟';
const titleEl = document.getElementById('animated-title');
let typingIndex = 0;
let isDeleting = false;
let typingSpeed = 120;

function typeWriter() {
  if (!titleEl) return;
  if (!isDeleting) {
    titleEl.textContent = typingText.slice(0, typingIndex + 1);
    typingIndex++;
    if (typingIndex === typingText.length) {
      isDeleting = true;
      typingSpeed = 1500; // pause at end
    } else {
      typingSpeed = 120;
    }
  } else {
    titleEl.textContent = typingText.slice(0, typingIndex - 1);
    typingIndex--;
    if (typingIndex === 0) {
      isDeleting = false;
      typingSpeed = 500; // pause at start
    } else {
      typingSpeed = 60;
    }
  }
  setTimeout(typeWriter, typingSpeed);
}
typeWriter();

// ========== Quote Rotator ==========
const quotes = [
  "Healing begins when we choose to speak up.",
  "Your voice is your power—use it wisely.",
  "Love harder, live louder.",
  "From pain comes strength.",
  "Hope shines brightest in the darkest moments.",
  "Every story matters; every life counts.",
  "Compassion is the cure.",
];
const quoteEl = document.getElementById('quote-rotator');
let currentQuoteIndex = 0;

function rotateQuotes() {
  if (!quoteEl) return;
  quoteEl.classList.remove('fade-in');
  quoteEl.classList.add('fade-out');
  setTimeout(() => {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    quoteEl.textContent = quotes[currentQuoteIndex];
    quoteEl.classList.remove('fade-out');
    quoteEl.classList.add('fade-in');
  }, 1000);
}
setInterval(rotateQuotes, 8000); // Change every 8 seconds
quoteEl.classList.add('fade-in');

// ========== Affirmation Generator ==========
const affirmations = [
  "I am worthy of love and kindness.",
  "My past does not define me.",
  "Every day, I grow stronger and more resilient.",
  "I choose to heal and thrive.",
  "My voice matters and will be heard.",
  "I am deserving of happiness and peace.",
  "I embrace hope and new beginnings.",
];
const affirmationBox = document.getElementById('affirmation-box');
const newAffirmationBtn = document.getElementById('new-affirmation');

function showNewAffirmation() {
  let newAffirm;
  do {
    newAffirm = affirmations[Math.floor(Math.random() * affirmations.length)];
  } while (newAffirm === affirmationBox.textContent);
  affirmationBox.textContent = newAffirm;
  burstConfetti();
}
if (newAffirmationBtn) {
  newAffirmationBtn.addEventListener('click', showNewAffirmation);
}

// ========== Navigation Pill Highlight ==========
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-list a');
const navPill = document.createElement('div');
navPill.className = 'nav-pill-highlight';
navList.appendChild(navPill);

function updatePill(link) {
  const rect = link.getBoundingClientRect();
  const navRect = navList.getBoundingClientRect();
  navPill.style.width = rect.width + 'px';
  navPill.style.left = (rect.left - navRect.left) + 'px';
  navPill.style.opacity = '1';
}
function hidePill() {
  navPill.style.opacity = '0';
}

navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => updatePill(link));
  link.addEventListener('focus', () => updatePill(link));
  link.addEventListener('mouseleave', hidePill);
  link.addEventListener('blur', hidePill);
});

// ========== Scroll-triggered Animations ==========
const scrollAnimElems = document.querySelectorAll('[data-scroll-animate]');
function onScrollAnimate() {
  const triggerBottom = window.innerHeight * 0.9;
  scrollAnimElems.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', onScrollAnimate);
window.addEventListener('load', onScrollAnimate);

// ========== Confetti Burst on Affirmation Change ==========
const confettiCanvas = document.getElementById('confetti-canvas');
const ctx = confettiCanvas.getContext('2d');
let confettiPieces = [];
let confettiAnimationFrame;

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

class ConfettiPiece {
  constructor() {
    this.x = randomRange(0, window.innerWidth);
    this.y = randomRange(-20, -100);
    this.size = randomRange(6, 12);
    this.speedY = randomRange(2, 5);
    this.speedX = randomRange(-2, 2);
    this.color = `hsl(${randomRange(0, 360)}, 70%, 60%)`;
    this.tilt = randomRange(-10, 10);
    this.tiltSpeed = randomRange(0.05, 0.1);
    this.tiltAngle = 0;
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.tiltAngle += this.tiltSpeed;
    this.tilt = Math.sin(this.tiltAngle) * 15;
    if (this.y > window.innerHeight) {
      this.y = randomRange(-20, -100);
      this.x = randomRange(0, window.innerWidth);
    }
  }
  draw() {
    ctx.beginPath();
    ctx.lineWidth = this.size / 2;
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.x + this.tilt, this.y);
    ctx.lineTo(this.x, this.y + this.tilt + this.size / 2);
    ctx.stroke();
  }
}

function burstConfetti() {
  confettiPieces = [];
  const count = 100;
  for (let i = 0; i < count; i++) {
    confettiPieces.push(new ConfettiPiece());
  }
  if (!confettiAnimationFrame) {
    animateConfetti();
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiPieces.forEach(p => {
    p.update();
    p.draw();
  });
  confettiAnimationFrame = requestAnimationFrame(animateConfetti);
  // Stop animation after 3 seconds
  setTimeout(() => {
    cancelAnimationFrame(confettiAnimationFrame);
    confettiAnimationFrame = null;
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }, 3000);
}

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// ========== Dark/Light Mode & Color Theme Toggle ==========
const themeToggleBtn = document.getElementById('theme-toggle');
const colorThemeSelector = document.getElementById('color-theme-selector');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function setColorTheme(color) {
  document.body.setAttribute('data-color-theme', color);
  localStorage.setItem('colorTheme', color);
}

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
});
colorThemeSelector.addEventListener('change', e => {
  setColorTheme(e.target.value);
});

// Load saved preferences or defaults
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);
  const savedColor = localStorage.getItem('colorTheme') || 'default';
  setColorTheme(savedColor);
});