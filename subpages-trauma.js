// Trauma & Abuse – Falling Light Shards Background + Quick Exit

const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

let width, height;
function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let shards = [];
for (let i = 0; i < 100; i++) {
  shards.push({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2 + 1,
    speed: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.3 + 0.1
  });
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  shards.forEach(s => {
    ctx.beginPath();
    ctx.fillStyle = `rgba(156, 39, 176, ${s.opacity})`;
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fill();
    s.y += s.speed;
    if (s.y > height) {
      s.y = -10;
      s.x = Math.random() * width;
    }
  });
  requestAnimationFrame(animate);
}
animate();

// Quick Exit
document.getElementById('quickExitBtn').addEventListener('click', () => {
  window.location.href = 'https://www.google.com';
});