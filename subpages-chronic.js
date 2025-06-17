// Chronic Conditions – Orbital Rings Animation + Quick Exit

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

  const rings = Array.from({ length: 8 }, (_, i) => ({
    radius: 50 + i * 30,
    angle: Math.random() * Math.PI * 2,
    speed: 0.001 + Math.random() * 0.002,
    alpha: 0.05 + Math.random() * 0.05
  }));

  function animate() {
    ctx.clearRect(0, 0, width, height);

    ctx.save();
    ctx.translate(width / 2, height / 2);

    for (let ring of rings) {
      ring.angle += ring.speed;
      ctx.beginPath();
      ctx.arc(
        Math.cos(ring.angle) * ring.radius,
        Math.sin(ring.angle) * ring.radius,
        ring.radius,
        0,
        Math.PI * 2
      );
      ctx.strokeStyle = `rgba(128, 222, 234, ${ring.alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    ctx.restore();
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