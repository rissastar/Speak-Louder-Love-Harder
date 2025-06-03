// Scroll Progress
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById('progress-bar').style.width = scrollPercent + '%';
});

// Dark Mode
const toggleBtn = document.getElementById('dark-mode-toggle');
const body = document.body;

if (localStorage.getItem('darkMode') === 'enabled') {
  body.classList.add('dark');
  toggleBtn.textContent = '☀️';
}

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  toggleBtn.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
  localStorage.setItem('darkMode', body.classList.contains('dark') ? 'enabled' : 'disabled');
});

// Theme Switcher
const themeSelect = document.getElementById('theme-select');
const currentTheme = localStorage.getItem('theme') || 'pastel';
body.classList.add(currentTheme);
themeSelect.value = currentTheme;

themeSelect.addEventListener('change', () => {
  body.classList.remove('pastel', 'bold', 'dark');
  body.classList.add(themeSelect.value);
  localStorage.setItem('theme', themeSelect.value);
});

// Typewriter
const typewriter = document.querySelector('.typewriter');
const messages = [
  'Speak Louder, Love Harder',
  'Your Voice Matters',
  'Heal. Advocate. Empower.',
  'Together We Rise.'
];
let index = 0;

function typeText(text, i, callback) {
  if (i < text.length) {
    typewriter.textContent = text.substring(0, i + 1);
    setTimeout(() => typeText(text, i + 1, callback), 80);
  } else {
    setTimeout(callback, 1500);
  }
}

function startTyping() {
  typeText(messages[index], 0, () => {
    index = (index + 1) % messages.length;
    startTyping();
  });
}

if (typewriter) startTyping();