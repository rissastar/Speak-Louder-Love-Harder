// Addiction & Recovery – Rising Smoke Particle Animation + Quick Exit

document.addEventListener("DOMContentLoaded", () => {
  // Create and insert canvas
  const canvas = document.createElement('canvas');
  canvas.id = 'backgroundCanvas';
  canvas.style.position = 'fixed';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width, height;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Create particles
  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * width,
    y: height + Math.random() * height,
    radius: 1 + Math.random() * 3,
    speed: 0.3 + Math.random() * 1.5,
    alpha: 0.1 + Math.random() * 0.3
  }));

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 111, 150, ${p.alpha})`;
      ctx.fill();

      p.y -= p.speed;
      p.alpha -= 0.0005;

      if (p.y < -10 || p.alpha <= 0) {
        p.x = Math.random() * width;
        p.y = height + Math.random() * 50;
        p.radius = 1 + Math.random() * 3;
        p.speed = 0.3 + Math.random() * 1.5;
        p.alpha = 0.1 + Math.random() * 0.3;
      }
    }

    requestAnimationFrame(animate);
  }

  animate();

  // Quick Exit Button
  const quickExitBtn = document.getElementById('quickExitBtn');
  if (quickExitBtn) {
    quickExitBtn.addEventListener('click', () => {
      window.location.href = 'https://www.google.com';
    });
  }
});