// Scroll progress bar
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById('progress-bar').style.width = scrollPercent + '%';
});

// Dark mode toggle
const darkToggle = document.getElementById('dark-mode-toggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  // Change button icon
  darkToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Ambient Music Setup
let musicPlaying = false;
const musicToggle = document.getElementById('music-toggle');
const ambientMusic = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_11db9a6a48.mp3?filename=ambient-chill-11265.mp3');
ambientMusic.loop = true;
ambientMusic.volume = 0.15;

musicToggle.addEventListener('click', () => {
  if (!musicPlaying) {
    ambientMusic.play();
    musicToggle.style.background = 'linear-gradient(45deg, #3399ff, #33cc99)';
  } else {
    ambientMusic.pause();
    musicToggle.style.background = 'linear-gradient(45deg, #33cc99, #3399ff)';
  }
  musicPlaying = !musicPlaying;
});

// Quote popup logic
const quotePopup = document.getElementById('quote-popup');
const closeQuoteBtn = document.getElementById('close-quote');

function showQuotePopup() {
  quotePopup.hidden = false;
  quotePopup.classList.add('show');
}

function hideQuotePopup() {
  quotePopup.classList.remove('show');
  setTimeout(() => {
    quotePopup.hidden = true;
  }, 400);
}

closeQuoteBtn.addEventListener('click', hideQuotePopup);

// Show the quote popup after 4 seconds of page load
window.addEventListener('load', () => {
  setTimeout(showQuotePopup, 4000);
});

// Animated hearts float (using CSS animation only, no JS needed)

// Paw prints on click/tap
document.body.addEventListener('click', e => {
  const paw = document.createElement('div');
  paw.className = 'paw-print';
  paw.style.left = (e.pageX - 11) + 'px'; // center by offset half size
  paw.style.top = (e.pageY - 11) + 'px';
  paw.innerHTML = `
    <svg viewBox="0 0 512 512" aria-hidden="true" focusable="false" >
      <path d="M256 128c26.51 0 48-21.49 48-48s-21.49-48-48-48-48 21.49-48 48 21.49 48 48 48zM128 256c26.51 0 48-21.49 48-48s-21.49-48-48-48-48 21.49-48 48 21.49 48 48 48zM384 256c26.51 0 48-21.49 48-48s-21.49-48-48-48-48 21.49-48 48 21.49 48 48 48zM160 384c26.51 0 48-21.49 48-48s-21.49-48-48-48-48 21.49-48 48 21.49 48 48 48zM352 384c26.51 0 48-21.49 48-48s-21.49-48-48-48-48 21.49-48 48 21.49 48 48 48z"/>
    </svg>
  `;
  document.body.appendChild(paw);

  // Animate fade and float upward, then remove
  setTimeout(() => {
    paw.style.transform = 'translateY(-30px) scale(0.5)';
    paw.style.opacity = '0';
  }, 10);

  setTimeout(() => {
    paw.remove();
  }, 1000);
});