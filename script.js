// Scroll Progress Bar
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById('progress-bar').style.width = scrollPercent + '%';
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  // Save preference
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
    darkModeToggle.textContent = '☀️';
  } else {
    localStorage.setItem('darkMode', 'disabled');
    darkModeToggle.textContent = '🌙';
  }
});

// Load dark mode preference
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
  // Create popup container
  const popup = document.createElement('div');
  popup.id = 'quote-popup';
  popup.style.position = 'fixed';
  popup.style.top = '20px';
  popup.style.right = '20px';
  popup.style.background = 'rgba(124, 77, 255, 0.9)';
  popup.style.color = 'white';
  popup.style.padding = '1rem 1.5rem';
  popup.style.borderRadius = '10px';
  popup.style.boxShadow = '0 4px 15px rgba(124, 77, 255, 0.7)';
  popup.style.zIndex = '9999';
  popup.style.fontSize = '1.2rem';
  popup.style.fontWeight = '600';
  popup.style.maxWidth = '250px';
  popup.style.cursor = 'pointer';
  popup.style.userSelect = 'none';

  // Pick quote of the day based on date
  const day = new Date().getDate();
  const quote = quotes[day % quotes.length];
  popup.textContent = quote;

  // Close popup on click
  popup.addEventListener('click', () => {
    popup.remove();
  });

  document.body.appendChild(popup);

  // Auto remove after 12 seconds
  setTimeout(() => {
    if (popup.parentNode) popup.remove();
  }, 12000);
}

window.addEventListener('load', showQuoteOfTheDay);

// Ambient Music Toggle
let musicPlaying = false;
const audio = new Audio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_3f8ff72cd3.mp3?filename=relaxing-ambient-background-music-11157.mp3');
audio.loop = true;
audio.volume = 0.15;

const musicToggleBtn = document.createElement('button');
musicToggleBtn.id = 'music-toggle';
musicToggleBtn.textContent = '🔈';
musicToggleBtn.title = 'Toggle ambient music';
musicToggleBtn.style.position = 'fixed';
musicToggleBtn.style.bottom = '20px';
musicToggleBtn.style.right = '70px';
musicToggleBtn.style.fontSize = '1.7rem';
musicToggleBtn.style.background = '#fff';
musicToggleBtn.style.border = 'none';
musicToggleBtn.style.borderRadius = '50%';
musicToggleBtn.style.padding = '0.6rem 0.7rem';
musicToggleBtn.style.cursor = 'pointer';
musicToggleBtn.style.zIndex = '99';
musicToggleBtn.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
musicToggleBtn.style.transition = 'background 0.3s';

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

document.body.appendChild(musicToggleBtn);

musicToggleBtn.addEventListener('mouseover', () => {
  musicToggleBtn.style.background = '#f0f0f0';
});
musicToggleBtn.addEventListener('mouseout', () => {
  musicToggleBtn.style.background = '#fff';
});

// Animated SVG Hearts Background
const heartsContainer = document.createElement('div');
heartsContainer.id = 'hearts-container';
heartsContainer.style.position = 'fixed';
heartsContainer.style.top = '0';
heartsContainer.style.left = '0';
heartsContainer.style.width = '100vw';
heartsContainer.style.height = '100vh';
heartsContainer.style.pointerEvents = 'none';
heartsContainer.style.zIndex = '0';
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

  // Animate upwards and sideways with random speed
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

// Create hearts continuously but limited number to prevent lag
setInterval(() => {
  if (heartsContainer.childElementCount < 25) {
    createHeart();
  }
}, 800);

// Paw prints following the cursor
const pawContainer = document.createElement('div');
pawContainer.id = 'paw-container';
pawContainer.style.position = 'fixed';
pawContainer.style.top = '0';
pawContainer.style.left = '0';
pawContainer.style.width = '100vw';
pawContainer.style.height = '100vh';
pawContainer.style.pointerEvents = 'none';
pawContainer.style.zIndex = '10';
document.body.appendChild(pawContainer);

function createPaw(x, y) {
  const paw = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  paw.setAttribute('viewBox', '0 0 64 64');
  paw.setAttribute('width', '25');
  paw.setAttribute('height', '25');
  paw.style.position = 'absolute';
  paw.style.left = x + 'px';
  paw.style.top = y + 'px';
  paw.style.opacity = '0.8';
  paw.style.fill = '#7c4dff';
  paw.style.pointerEvents = 'none';
  paw.style.willChange = 'transform, opacity';

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute('d', 'M47.3 22.1c-3.4 0-6.2 4-6.2 9 0 5 2.8 9 6.2 9s6.2-4 6.2-9-2.8-9-6.2-9zm-19.6 0c-3.4 0-6.2 4-6.2 9 0 5 2.8 9 6.2 9s6.2-4 6.2-9-2.8-9-6.2-9zm10.2-13.3c-2.1 0-3.8 3-3.8 6.7 0 3.7 1.7 6.7 3.8 6.7s3.8-3 3.8-6.7c0-3.8-1.7-6.7-3.8-6.7zm-15.7 1.7c-1.9 0-3.5 2.4-3.5 5.3 0 2.9 1.6 5.3 3.5 5.3s3.5-2.4 3.5-5.3c0-2.9-1.6-5.3-3.5-5.3zm7.8 15.8c-8.6 0-15.6 7-15.6 15.6 0 2.4 0.6 4.7 1.7 6.7 3.2-1.5 9-5.2 13.9-5.2 4.9 0 10.6 3.7 13.9 5.2 1.1-2 1.7-4.3 1.7-6.7-0.1-8.6-7-15.6-15.6-15.6z');
  paw.appendChild(path);

  pawContainer.appendChild(paw);

  // Animate paw fade out and move up
  let opacity = 0.8;
  let posY = y;
  let life = 0;

  function animate() {
    if (opacity <= 0) {
      pawContainer.removeChild(paw);
      return;
    }
    life++;
    posY -= 0.7;
    opacity -= 0.02;
    paw.style.top = posY + 'px';
    paw.style.opacity = opacity;
    requestAnimationFrame(animate);
  }
  animate();
}

document.addEventListener('mousemove', (e) => {
  createPaw(e.clientX, e.clientY);
});