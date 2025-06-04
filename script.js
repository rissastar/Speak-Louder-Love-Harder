// ========= THEME TOGGLE ==========
const themeToggleBtn = document.querySelector('.theme-toggle-btn');
const body = document.body;

function applySavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
  }
}

themeToggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  const newTheme = body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', newTheme);
});

document.addEventListener('DOMContentLoaded', applySavedTheme);

// ========= QUOTE ROTATOR ==========
const quotes = [
  "Speak louder. Love harder. Heal deeper. 💚",
  "You are not alone. 💜",
  "Every scar tells a story of survival. 🌟",
  "Healing begins with being heard. 💖",
  "Hope is stronger than fear. ✨",
  "Your voice matters. Your story matters. 🦋",
  "Advocate with passion. Support with love. 🫶"
];
let quoteIndex = 0;
const quoteEl = document.getElementById('quote-rotator');

function rotateQuote() {
  if (quoteEl) {
    quoteEl.style.opacity = 0;
    setTimeout(() => {
      quoteIndex = (quoteIndex + 1) % quotes.length;
      quoteEl.textContent = quotes[quoteIndex];
      quoteEl.style.opacity = 1;
    }, 500);
  }
}
setInterval(rotateQuote, 5000);

// ========= TYPING EFFECT ==========
const typingTarget = document.querySelector('.typing-text');
if (typingTarget) {
  const typingText = "Welcome to Speak Louder, Love Harder 🌟";
  let i = 0;
  function type() {
    if (i < typingText.length) {
      typingTarget.textContent += typingText.charAt(i);
      i++;
      setTimeout(type, 75);
    }
  }
  type();
}

// ========= SCROLL ANIMATIONS ==========
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.querySelectorAll('.fade-in, .slide-up').forEach(el => observer.observe(el));

// ========= MOOD-BASED BACKGROUNDS ==========
const pageName = document.body.getAttribute('data-page');
if (pageName) {
  document.body.classList.add(`mood-${pageName}`);
}

// ========= MODAL SUPPORT BOX ==========
const helpBtn = document.querySelector('.open-help');
const helpModal = document.querySelector('.help-modal');
const helpClose = document.querySelector('.help-close');

if (helpBtn && helpModal && helpClose) {
  helpBtn.addEventListener('click', () => helpModal.classList.add('show'));
  helpClose.addEventListener('click', () => helpModal.classList.remove('show'));
  window.addEventListener('click', e => {
    if (e.target === helpModal) helpModal.classList.remove('show');
  });
}

// ========= TEXT TO SPEECH ==========
const speakBtn = document.querySelector('.speak-text');
if (speakBtn) {
  speakBtn.addEventListener('click', () => {
    const msg = new SpeechSynthesisUtterance(document.body.innerText);
    msg.rate = 1;
    msg.pitch = 1.2;
    window.speechSynthesis.speak(msg);
  });
}

// ========= FLOATING HEARTS ==========
document.addEventListener('click', e => {
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.style.left = `${e.clientX}px`;
  heart.style.top = `${e.clientY}px`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1500);
});

// ========= QUOTE WALL SUBMISSION ==========
const quoteForm = document.getElementById('quote-form');
const quoteList = document.getElementById('quote-wall');

if (quoteForm && quoteList) {
  quoteForm.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('new-quote');
    const newQuote = input.value.trim();
    if (newQuote) {
      const li = document.createElement('li');
      li.textContent = newQuote;
      quoteList.appendChild(li);
      input.value = '';
    }
  });
}

// ========= SCROLL PROGRESS BAR ==========
const progressBar = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  if (progressBar) progressBar.style.width = `${scrollPercent}%`;
});