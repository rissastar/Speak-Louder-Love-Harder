// Animated background: soft purple/blue swirls + gentle floating pulses
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];
  for (let i = 0; i < 75; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: (Math.random() - 0.5) * 0.6,
      alpha: Math.random() * 0.3 + 0.1
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  let gradient = ctx.createRadialGradient(
    width / 2, height / 2, 100,
    width / 2, height / 2, Math.max(width, height)
  );
  gradient.addColorStop(0, '#1e0033');
  gradient.addColorStop(1, '#000011');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,150,255,${p.alpha})`;
    ctx.fill();

    p.x += p.speedX;
    p.y += p.speedY;

    // Bounce or loop edges
    if (p.x < 0 || p.x > width) p.speedX *= -1;
    if (p.y < 0 || p.y > height) p.speedY *= -1;
  }

  requestAnimationFrame(animate);
}

// Quick exit button
document.getElementById("quickExitBtn").addEventListener("click", () => {
  window.location.href = "https://www.google.com";
});

// Initialize
resize();
createParticles();
animate();
window.addEventListener('resize', () => {
  resize();
  createParticles();
});