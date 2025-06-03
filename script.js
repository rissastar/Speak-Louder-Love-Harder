// Scroll Progress Bar
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById('progress-bar').style.width = scrollPercent + '%';
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Load saved mode
if (localStorage.getItem('darkMode') === 'enabled') {
  body.classList.add('dark-mode');
  darkModeToggle.textContent = '☀️';
} else {
  darkModeToggle.textContent = '🌙';
}

// Toggle behavior
darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    darkModeToggle.textContent = '☀️';
    localStorage.setItem('darkMode', 'enabled');
  } else {
    darkModeToggle.textContent = '🌙';
    localStorage.setItem('darkMode', 'disabled');
  }
});

// Smooth Scroll for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const targetID = anchor.getAttribute('href').substring(1);
    const target = document.getElementById(targetID);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Typewriter Effect
const typewriterElement = document.querySelector('.typewriter');
const messages = [
  'Speak Louder, Love Harder',
  'Advocate. Heal. Empower.',
  'Your Voice Matters',
  'Together We Rise'
];
let msgIndex = 0;

function typeWriterEffect(text, i, callback) {
  if (!typewriterElement) return;
  if (i < text.length) {
    typewriterElement.textContent = text.substring(0, i + 1);
    setTimeout(() => typeWriterEffect(text, i + 1, callback), 100);
  } else {
    setTimeout(callback, 1500);
  }
}

function startTypingLoop() {
  typeWriterEffect(messages[msgIndex], 0, () => {
    setTimeout(() => {
      msgIndex = (msgIndex + 1) % messages.length;
      startTypingLoop();
    }, 1000);
  });
}

if (typewriterElement) {
  startTypingLoop();
}