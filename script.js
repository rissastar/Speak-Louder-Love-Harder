// === Scroll Progress Bar ===
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById('progress-bar').style.width = scrollPercent + '%';
});

// === Dark Mode Toggle ===
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Load saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
  body.classList.add('dark-mode');
  darkModeToggle.textContent = '☀️';
  darkModeToggle.setAttribute('aria-pressed', 'true');
} else {
  darkModeToggle.textContent = '🌙';
  darkModeToggle.setAttribute('aria-pressed', 'false');
}

darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');
  darkModeToggle.textContent = isDark ? '☀️' : '🌙';
  darkModeToggle.setAttribute('aria-pressed', isDark);
  localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
});

// === Smooth Scroll for Internal Links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const targetID = anchor.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetID);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// === Typewriter Effect with Rotating Messages ===
const typewriterElement = document.querySelector('.typewriter');
const messages = [
  'Speak Louder, Love Harder',
  'Advocate. Heal. Empower.',
  'Your Voice Matters',
  'Together We Rise'
];
let msgIndex = 0;

function typeWriterEffect(text, i, callback) {
  if (i < text.length) {
    typewriterElement.textContent = text.substring(0, i + 1);
    setTimeout(() => typeWriterEffect(text, i + 1, callback), 100);
  } else {
    setTimeout(callback, 1500);
  }
}

function startTypingLoop() {
  typeWriterEffect(messages[msgIndex], 0, () => {
    msgIndex = (msgIndex + 1) % messages.length;
    startTypingLoop();
  });
}

if (typewriterElement) {
  typewriterElement.textContent = '';
  startTypingLoop();
}

// === Heart Button Confetti & Sound ===
const heartBtn = document.querySelector('.heart-button');

if (heartBtn) {
  heartBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Animate the heart
    heartBtn.classList.add('animate');
    setTimeout(() => heartBtn.classList.remove('animate'), 400);

    // Create confetti
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('span');
      confetti.classList.add('confetti');
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.animationDuration = 1 + Math.random() * 1.5 + 's';
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 2000);
    }

    // Optional: play sound
    const pop = new Audio('https://freesound.org/data/previews/341/341695_5260877-lq.mp3');
    pop.volume = 0.4;
    pop.play();
  });
}