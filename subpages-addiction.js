// Animated Background - flowing lines to symbolize paths & complexity
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lines = [];

function createLines(count) {
  for (let i = 0; i < count; i++) {
    lines.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 40 + 10,
      speed: Math.random() * 0.5 + 0.3,
      angle: Math.random() * Math.PI * 2,
      alpha: Math.random() * 0.6 + 0.2,
      color: `rgba(136, 136, 255, ${Math.random() * 0.4 + 0.1})`
    });
  }
}

function animateLines() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  lines.forEach(line => {
    ctx.beginPath();
    const endX = line.x + Math.cos(line.angle) * line.length;
    const endY = line.y + Math.sin(line.angle) * line.length;
    ctx.strokeStyle = line.color;
    ctx.globalAlpha = line.alpha;
    ctx.moveTo(line.x, line.y);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    line.x += Math.cos(line.angle) * line.speed;
    line.y += Math.sin(line.angle) * line.speed;

    // Wrap around screen
    if (line.x < 0 || line.x > canvas.width || line.y < 0 || line.y > canvas.height) {
      line.x = Math.random() * canvas.width;
      line.y = Math.random() * canvas.height;
    }
  });
  requestAnimationFrame(animateLines);
}

createLines(90);
animateLines();

// Responsive canvas
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Quick Exit Button
document.getElementById('quickExitBtn').addEventListener('click', () => {
  window.location.href = 'https://www.google.com';
});