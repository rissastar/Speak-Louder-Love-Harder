// ===== Scroll Progress Bar =====
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + '%';
});

// ===== Dark Mode Toggle =====
const darkModeBtn = document.getElementById('dark-mode-toggle');

function applyDarkMode(isDark) {
  if (isDark) {
    document.body.classList.add('dark-mode');
    darkModeBtn.textContent = '☀️'; // sun icon for light mode
  } else {
    document.body.classList.remove('dark-mode');
    darkModeBtn.textContent = '🌙'; // moon icon for dark mode
  }
  localStorage.setItem('darkMode', isDark);
}

// Initialize dark mode based on saved preference or system
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode !== null) {
  applyDarkMode(savedDarkMode === 'true');
} else {
  // Default to system preference
  applyDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
}

darkModeBtn.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark-mode');
  applyDarkMode(!isDark);
});

// ===== Ambient Music Toggle =====
const ambientMusic = new Audio('ambient-music.mp3'); // Put your ambient music file here
ambientMusic.loop = true;
ambientMusic.volume = 0.15; // subtle volume

const musicBtn = document.createElement('button');
musicBtn.id = 'music-toggle';
musicBtn.textContent = '🔈'; // speaker icon for off
musicBtn.setAttribute('aria-label', 'Toggle ambient music');
musicBtn.style.position = 'fixed';
musicBtn.style.bottom = '100px';
musicBtn.style.right = '20px';
musicBtn.style.fontSize = '2.4rem';
musicBtn.style.background = '#3ecf8e'; // tealish
musicBtn.style.color = '#fff';
musicBtn.style.border = 'none';
musicBtn.style.borderRadius = '50%';
musicBtn.style.padding = '0.3rem 0.4rem';
musicBtn.style.boxShadow = '0 5px 20px rgba(62, 207, 142, 0.6)';
musicBtn.style.cursor = 'pointer';
musicBtn.style.zIndex = '102';
musicBtn.style.userSelect = 'none';

document.body.appendChild(musicBtn);

let musicPlaying = false;

musicBtn.addEventListener('click', () => {
  if (!musicPlaying) {
    ambientMusic.play();
    musicBtn.textContent = '🔊'; // speaker on icon
    musicBtn.style.background = '#2c9d70';
    musicPlaying = true;
  } else {
    ambientMusic.pause();
    musicBtn.textContent = '🔈';
    musicBtn.style.background = '#3ecf8e';
    musicPlaying = false;
  }
});

// ===== Popup Quote of the Day =====
const quotes = [
  "“The wound is the place where the Light enters you.” — Rumi",
  "“Speak your truth, even if your voice shakes.” — Maggie Kuhn",
  "“Healing takes time, and asking for help is a courageous step.” — Mariska Hargitay",
  "“You are stronger than you know.” — Anonymous",
  "“Love yourself first, because that's who you'll be spending the rest of your life with.” — Unknown",
  "“Rise above the storm and you will find the sunshine.” — Mario Fernandez",
];

function showQuotePopup() {
  const quotePopup = document.createElement('div');
  quotePopup.id = 'quote-popup';
  quotePopup.textContent = quotes[Math.floor(Math.random() * quotes.length)];
  quotePopup.style.position = 'fixed';
  quotePopup.style.bottom = '20px';
  quotePopup.style.left = '20px';
  quotePopup.style.background = 'rgba(255, 111, 97, 0.9)';
  quotePopup.style.color = '#fff';
  quotePopup.style.padding = '1rem 1.5rem';
  quotePopup.style.borderRadius = '16px';
  quotePopup.style.fontWeight = '600';
  quotePopup.style.fontSize = '1.1rem';
  quotePopup.style.boxShadow = '0 4px 18px rgba(255, 111, 97, 0.7)';
  quotePopup.style.zIndex = '1000';
  quotePopup.style.userSelect = 'none';
  quotePopup.style.cursor = 'pointer';
  quotePopup.title = "Click to dismiss";

  document.body.appendChild(quotePopup);

  // Remove on click
  quotePopup.addEventListener('click', () => {
    quotePopup.remove();
  });

  // Auto-remove after 15 seconds
  setTimeout(() => {
    if (quotePopup.parentElement) {
      quotePopup.remove();
    }
  }, 15000);
}

// Show quote popup on page load, with 2s delay
window.addEventListener('load', () => {
  setTimeout(showQuotePopup, 2000);
});

// ===== Paw Prints Following Cursor =====
const pawColors = ['#f254a5', '#3ecf8e', '#ff6f61', '#5a2a83', '#4096ee'];
const pawPrints = [];
const maxPaws = 15;

function createPawPrint(x, y) {
  const paw = document.createElement('div');
  paw.classList.add('paw-print');
  paw.style.left = `${x}px`;
  paw.style.top = `${y}px`;
  paw.style.backgroundColor = pawColors[Math.floor(Math.random() * pawColors.length)];
  paw.style.width = `${Math.random() * 10 + 10}px`;
  paw.style.height = paw.style.width;
  paw.style.opacity = 0.7;
  paw.style.position = 'fixed';
  paw.style.pointerEvents = 'none';
  paw.style.borderRadius = '50%';
  paw.style.transform = `rotate(${Math.random() * 360}deg)`;
  paw.style.transition = 'opacity 1.2s ease';

  document.body.appendChild(paw);
  pawPrints.push(paw);

  // Fade out and remove paw print
  setTimeout(() => {
    paw.style.opacity = 0;
  }, 50);
  setTimeout(() => {
    if (paw.parentElement) paw.parentElement.removeChild(paw);
    const index = pawPrints.indexOf(paw);
    if (index > -1) pawPrints.splice(index, 1);
  }, 1300);
}

window.addEventListener('mousemove', (e) => {
  if (pawPrints.length < maxPaws) {
    createPawPrint(e.clientX, e.clientY);
  }
});

// ===== Optional: Prevent page bounce on iOS Safari (if needed) =====
// window.addEventListener('touchmove', function(e) {
//   e.preventDefault();
// }, { passive: false });