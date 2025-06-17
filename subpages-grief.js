// === Floating Candlelight Effect ===
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
let width, height, particles;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createParticles(count) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      speedY: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.4 + 0.2
    });
  }
  return arr;
}

function drawParticles() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'rgba(255, 244, 194, 0.6)';
  particles.forEach(p => {
    ctx.beginPath();
    ctx.globalAlpha = p.opacity;
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
    p.y -= p.speedY;
    if (p.y < -10) {
      p.y = height + 10;
      p.x = Math.random() * width;
    }
  });
  requestAnimationFrame(drawParticles);
}
particles = createParticles(100);
drawParticles();

// === Quick Exit ===
document.getElementById('quickExitBtn').addEventListener('click', () => {
  window.location.href = 'https://www.google.com';
});

// === Grief Journaling (localStorage) ===
function saveJournal() {
  const entry = document.querySelector('.journal-box').value.trim();
  if (entry) {
    const saved = JSON.parse(localStorage.getItem('griefJournal') || '[]');
    saved.push({ date: new Date().toLocaleString(), text: entry });
    localStorage.setItem('griefJournal', JSON.stringify(saved));
    alert("Your journal entry has been saved locally.");
    document.querySelector('.journal-box').value = '';
  } else {
    alert("Please write something before saving.");
  }
}

// === Tribute Submission (Memorial Wall) ===
const tributeForm = document.querySelector('.tribute-form');
if (tributeForm) {
  const nameInput = tributeForm.querySelector('input');
  const messageInput = tributeForm.querySelector('textarea');
  const memorialsContainer = document.getElementById('memorials');

  tributeForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    if (name && message) {
      const tribute = document.createElement('p');
      tribute.innerHTML = `<strong>${name}</strong>: ${message}`;
      memorialsContainer.prepend(tribute);
      nameInput.value = '';
      messageInput.value = '';
    }
  });
}