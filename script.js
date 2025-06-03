// Scroll Progress Bar
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById('progress-bar').style.width = scrollPercent + '%';

  // Show/hide scroll-to-top button with fade effect
  if (scrollTop > 300) {
    scrollToTopBtn.style.opacity = '1';
    scrollToTopBtn.style.pointerEvents = 'auto';
    scrollToTopBtn.style.transform = 'translateY(0)';
  } else {
    scrollToTopBtn.style.opacity = '0';
    scrollToTopBtn.style.pointerEvents = 'none';
    scrollToTopBtn.style.transform = 'translateY(20px)';
  }
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
    darkModeToggle.textContent = '☀️';
  } else {
    localStorage.setItem('darkMode', 'disabled');
    darkModeToggle.textContent = '🌙';
  }
});

if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  darkModeToggle.textContent = '☀️';
} else {
  darkModeToggle.textContent = '🌙';
}

// Quote of the Day Popup
const quotes = [
  "“Speak louder than the noise around you.”",
  "“Love harder, fight stronger, live freer.”",
  "“Your story is your power.”",
  "“Healing begins when you’re heard.”",
  "“You are not alone.”",
];

function showQuoteOfTheDay() {
  const popup = document.createElement('div');
  popup.id = 'quote-popup';
  Object.assign(popup.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: 'rgba(124, 77, 255, 0.9)',
    color: 'white',
    padding: '1rem 1.5rem',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(124, 77, 255, 0.7)',
    zIndex: '9999',
    fontSize: '1.2rem',
    fontWeight: '600',
    maxWidth: '250px',
    cursor: 'pointer',
    userSelect: 'none'
  });

  const day = new Date().getDate();
  const quote = quotes[day % quotes.length];
  popup.textContent = quote;

  popup.addEventListener('click', () => {
    popup.remove();
  });

  document.body.appendChild(popup);

  setTimeout(() => {
    if (popup.parentNode) popup.remove();
  }, 12000);
}

window.addEventListener('load', () => {
  showQuoteOfTheDay();
  checkMobileAndMute();
});

// Ambient Music Toggle
let musicPlaying = false;
const audio = new Audio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_3f8ff72cd3.mp3?filename=relaxing-ambient-background-music-11157.mp3');
audio.loop = true;
audio.volume = 0.15;

const musicToggleBtn = document.createElement('button');
musicToggleBtn.id = 'music-toggle';
musicToggleBtn.textContent = '🔈';
musicToggleBtn.title = 'Toggle ambient music';
Object.assign(musicToggleBtn.style, {
  position: 'fixed',
  bottom: '20px',
  right: '70px',
  fontSize: '1.7rem',
  background: '#fff',
  border: 'none',
  borderRadius: '50%',
  padding: '0.6rem 0.7rem',
  cursor: 'pointer',
  zIndex: '99',
  boxShadow: '0 0 10px rgba(0,0,0,0.2)',
  transition: 'background 0.3s'
});

musicToggleBtn.addEventListener('click', () => {
  if (!musicPlaying) {
    audio.play();
    musicToggleBtn.textContent = '🔊';
    musicPlaying = true;
  } else {
    audio.pause();
    musicToggleBtn.textContent = '🔈';
    musicPlaying = false;
  }
});

musicToggleBtn.addEventListener('mouseover', () => {
  musicToggleBtn.style.background = '#f0f0f0';
});
musicToggleBtn.addEventListener('mouseout', () => {
  musicToggleBtn.style.background = '#fff';
});

document.body.appendChild(musicToggleBtn);

// Mute ambient music on mobile autoplay to avoid unexpected sound
function checkMobileAndMute() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (isMobile) {
    audio.muted = true;
    musicToggleBtn.textContent = '🔇'; // show muted icon initially
    musicPlaying = false;
  }
}

// Animated SVG Hearts Background
const heartsContainer = document.createElement('div');
heartsContainer.id = 'hearts-container';
Object.assign(heartsContainer.style, {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  pointerEvents: 'none',
  zIndex: '0'
});
document.body.appendChild(heartsContainer);

function createHeart() {
  const heart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  heart.setAttribute('viewBox', '0 0 24 24');
  heart.setAttribute('width', '30');
  heart.setAttribute('height', '30');
  heart.style.position = 'absolute';
  heart.style.fill = `hsl(${Math.random()*360}, 70%, 70%)`;
  heart.style.opacity = 0.7;
  heart.style.left = Math.random() * window.innerWidth + 'px';
  heart.style.top = window.innerHeight + 40 + 'px';
  heart.style.pointerEvents = 'none';
  heart.style.willChange = 'transform';

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute('d', 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z');
  heart.appendChild(path);

  heartsContainer.appendChild(heart);

  let posY = window.innerHeight + 40;
  let posX = parseFloat(heart.style.left);
  const speedY = 1 + Math.random() * 2;
  const amplitude = 20 + Math.random() * 30;
  const frequency = 0.02 + Math.random() * 0.02;
  let angle = 0;

  function animate() {
    if (posY < -40) {
      heartsContainer.removeChild(heart);
      return;
    }
    posY -= speedY;
    angle += frequency;
    posX += Math.sin(angle) * 0.8;
    heart.style.top = posY + 'px';
    heart.style.left = posX + 'px';
    requestAnimationFrame(animate);
  }
  animate();
}

setInterval(() => {
  if (heartsContainer.childElementCount < 25) {
    createHeart();
  }
}, 800);

// Paw prints following the cursor
const pawContainer = document.createElement('div');
pawContainer.id = 'paw-container';
Object.assign(pawContainer.style, {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  pointerEvents: 'none',
  zIndex: '10'
});
document.body.appendChild(pawContainer);

function createPaw(x, y) {
  const paw = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  paw.setAttribute('viewBox', '0 0 64 64');
  paw.setAttribute('width', '25');
  paw.setAttribute('height', '25');
  Object.assign(paw.style, {
    position: 'absolute',
    left: x + 'px',
    top: y + 'px',
    opacity: '0.8',
    fill: '#7c4dff',
    pointerEvents: 'none',
    willChange: 'transform, opacity'
  });

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute('d', 'M47.3 22.1c-3.4 0-6.2 4-6.2 9 0 5 2.8 9 6.2 9s6.2-4 6.2-9-2.8-9-6.2-9zm-19.6 0c-3.4 0-6.2 4-6.2 9 0 5 2.8 9 6.2 9s6.2-4 6.2-9-2.8-9-6.2-9zm10.2-13.3c-2.1 0-3.8 3-3.8 6.7 0 3.7 1.7 6.7 3.8 6.7s3.8-3 3.8-6.7c0-3.7-1.7-6.7-3.8-6.7zm-9.3 2.3c-1.7 0-3.1 2.3-3.1 5.1 0 2.8 1.4 5.1 3.1 5.1s3.1-2.3 3.1-5.1c0-2.8-1.4-5.1-3.1-5.1zM32 27.1c-9 0-17.8 8.5-17.8 17.7 0 10.1 17.8 20.9 17.8 20.9s17.8-10.7 17.8-20.9c0-9.3-8.8-17.7-17.8-17.7z');
  paw.appendChild(path);
  pawContainer.appendChild(paw);

  let opacity = 0.8;
  let scale = 1;
  let yPos = y;

  function animate() {
    opacity -= 0.02;
    scale += 0.01;
    yPos -= 0.7;

    if (opacity <= 0) {
      pawContainer.removeChild(paw);
      return;
    }

    paw.style.opacity = opacity;
    paw.style.transform = `translateY(${yPos - y}px) scale(${scale})`;
    requestAnimationFrame(animate);
  }
  animate();
}

window.addEventListener('mousemove', (e) => {
  createPaw(e.clientX - 12, e.clientY - 12);
});

// Scroll-to-top button with fade-in effect
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.id = 'scroll-to-top';
scrollToTopBtn.innerHTML = '⬆️';
scrollToTopBtn.title = 'Scroll to Top';

Object.assign(scrollToTopBtn.style, {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  fontSize: '1.7rem',
  backgroundColor: '#f7f7f7',
  border: '2px solid #ccc',
  borderRadius: '50%',
  padding: '0.6rem 0.8rem',
  cursor: 'pointer',
  zIndex: '1000',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  transition: 'opacity 0.4s ease, transform 0.3s ease',
  opacity: '0',
  transform: 'translateY(20px)',
  pointerEvents: 'none'
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.body.appendChild(scrollToTopBtn);