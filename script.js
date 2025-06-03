// Dark Mode Toggle with localStorage persistence
const toggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Load saved mode on page load
if (localStorage.getItem('darkMode') === 'enabled') {
  body.classList.add('dark-mode');
  toggle.textContent = '☀️'; // sun icon
} else {
  toggle.textContent = '🌙'; // moon icon
}

toggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
    toggle.textContent = '☀️';
  } else {
    localStorage.setItem('darkMode', 'disabled');
    toggle.textContent = '🌙';
  }
});

// Scroll progress bar
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + '%';
});

// Confetti animation on clicking hero h1
const heroHeading = document.querySelector('.hero h1');
heroHeading.style.cursor = 'pointer';

heroHeading.addEventListener('click', () => {
  launchConfetti();
});

// Simple confetti function
function launchConfetti() {
  const confettiCount = 100;
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
    confetti.style.backgroundColor = getRandomPurpleColor();
    document.body.appendChild(confetti);
    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}

// Helper to get random purple shades
function getRandomPurpleColor() {
  const purples = [
    '#b366ff', '#7c4dff', '#a64ca6', '#d1a3ff', '#5b3fc4',
    '#b08de6', '#9269e6', '#a67de6', '#c9a1ff', '#8358ff'
  ];
  return purples[Math.floor(Math.random() * purples.length)];
}

const sections = document.querySelectorAll('.section, .hero');

function floatingEffect() {
  if(window.innerWidth <= 768) {
    // Disable floating on small screens
    sections.forEach(section => section.style.transform = 'none');
    return;
  }
  sections.forEach(section => {
    section.style.transform = `translateY(${Math.sin(Date.now() / 700) * 5}px)`;
  });
}

window.addEventListener('scroll', floatingEffect);
window.addEventListener('resize', floatingEffect);

floatingEffect(); // Initial call