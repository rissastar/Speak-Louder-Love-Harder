// Scroll Progress Bar
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + '%';
});

// Dark Mode Toggle
const toggleBtn = document.getElementById('dark-mode-toggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Confetti Burst on Click with Soft Pastels
const pastelColors = ['#ff80ab', '#7c4dff', '#ec407a', '#ba68c8', '#f48fb1', '#ce93d8'];
const confettiCount = 25;

function createConfetti(x, y) {
  const confetti = document.createElement('div');
  confetti.style.position = 'fixed';
  confetti.style.left = `${x}px`;
  confetti.style.top = `${y}px`;
  confetti.style.width = '7px';
  confetti.style.height = '7px';
  confetti.style.backgroundColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
  confetti.style.borderRadius = '50%';
  confetti.style.pointerEvents = 'none';
  confetti.style.opacity = '1';
  confetti.style.zIndex = '10000';
  confetti.style.transform = 'translate(0, 0)';
  confetti.style.transition = 'transform 600ms ease-out, opacity 600ms ease-out';

  document.body.appendChild(confetti);

  const angle = Math.random() * 2 * Math.PI;
  const distance = 70 + Math.random() * 40;
  const rotate = (Math.random() * 360) + 180;

  requestAnimationFrame(() => {
    confetti.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) rotate(${rotate}deg)`;
    confetti.style.opacity = '0';
  });

  setTimeout(() => confetti.remove(), 600);
}

window.addEventListener('click', e => {
  for(let i = 0; i < confettiCount; i++) {
    createConfetti(e.clientX, e.clientY);
  }
});

// Glitter Effect on Magic Links (adds/removes a CSS class to trigger animation)
const magicLinks = document.querySelectorAll('.magic-link');

magicLinks.forEach(link => {
  link.addEventListener('mouseenter', () => link.classList.add('glitter'));
  link.addEventListener('mouseleave', () => link.classList.remove('glitter'));
});

// Gentle Floating Scroll Bounce Effect
let lastScrollY = 0;
let floatOffset = 0;
let direction = 1;

function floatBounce() {
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY) {
    floatOffset += direction * 0.4;
  } else {
    floatOffset -= direction * 0.4;
  }
  if (floatOffset > 8 || floatOffset < -8) direction *= -1;
  document.body.style.transform = `translateY(${floatOffset}px)`;
  lastScrollY = currentScrollY;
  requestAnimationFrame(floatBounce);
}

floatBounce();