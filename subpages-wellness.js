// subpages-wellness.js

// Animated starfield background
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
let stars = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function createStars(count) {
  stars = [];
  for(let i=0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.2 + 0.05,
      alpha: Math.random()
    });
  }
}
createStars(120);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    star.x += star.speed;
    if (star.x > canvas.width) star.x = 0;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI*2);
    ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();

// Quick exit button - redirect to Google
const quickExitBtn = document.getElementById('quickExitBtn');
quickExitBtn.addEventListener('click', () => {
  window.location.href = 'https://www.google.com';
});

// Notes save to localStorage
const saveNotesBtn = document.getElementById('saveNotesBtn');
const notesBox = document.querySelector('.notes-box');
const STORAGE_KEY = 'wellness-notes';

function loadNotes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) notesBox.value = saved;
}
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, notesBox.value);
  alert('Notes saved locally.');
}

saveNotesBtn.addEventListener('click', saveNotes);
loadNotes();