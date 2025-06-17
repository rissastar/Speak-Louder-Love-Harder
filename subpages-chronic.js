// === Animated Background – Gentle Wave Particles ===
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
let width, height;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let lines = [];
for (let i = 0; i < 40; i++) {
  lines.push({
    x: Math.random() * width,
    y: Math.random() * height,
    speed: 0.3 + Math.random() * 0.5,
    amplitude: 10 + Math.random() * 20,
    frequency: 0.002 + Math.random() * 0.002
  });
}

function animateLines(time) {
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = 'rgba(147, 249, 220, 0.3)';
  ctx.lineWidth = 1.2;

  lines.forEach(line => {
    ctx.beginPath();
    for (let x = 0; x < width; x += 5) {
      let y = line.y + Math.sin(x * line.frequency + time * 0.002) * line.amplitude;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    line.y -= line.speed;
    if (line.y < -20) line.y = height + 20;
  });

  requestAnimationFrame(animateLines);
}
animateLines(0);

// === Quick Exit Button ===
document.getElementById('quickExitBtn').addEventListener('click', () => {
  window.location.href = 'https://www.google.com';
});

// === Save Notes to localStorage ===
function saveNotes() {
  const note = document.querySelector('.notes-box').value.trim();
  if (note) {
    const saved = JSON.parse(localStorage.getItem('chronicNotes') || '[]');
    saved.push({ date: new Date().toLocaleString(), text: note });
    localStorage.setItem('chronicNotes', JSON.stringify(saved));
    alert("Your note has been saved locally.");
    document.querySelector('.notes-box').value = '';
  } else {
    alert("Please enter something to save.");
  }
}