// Chronic Conditions – Slow Rising Bubbles Animation + Quick Exit

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.createElement('canvas');
  canvas.id = 'backgroundCanvas';
  canvas.style.position = 'fixed';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
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

  const bubbles = Array.from({ length: 40 }, () => ({
    x: Math.random() * width,
    y: height + Math.random() * 200,
    radius: 10 + Math.random() * 15,
    speedY: 0.3 + Math.random() * 0.6,
    alpha: 0.1 + Math.random() * 0.3
  }));

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let b of bubbles) {
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(173, 216, 230, ${b.alpha})`;
      ctx.fill();

      b.y -= b.speedY;
      if (b.y < -b.radius) {
        b.y = height + b.radius;
        b.x = Math.random() * width;
        b.alpha = 0.1 + Math.random() * 0.3;
      }
    }
    requestAnimationFrame(animate);
  }

  animate();

  // Quick Exit
  const quickExitBtn = document.getElementById('quickExitBtn');
  if (quickExitBtn) {
    quickExitBtn.addEventListener('click', () => {
      window.location.href = 'https://www.google.com';
    });
  }
});