// Addiction & Recovery – Flowing Flame Animation + Quick Exit

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

  const flames = Array.from({ length: 40 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 15 + Math.random() * 20,
    speedY: 0.5 + Math.random() * 1.2,
    alpha: 0.1 + Math.random() * 0.3,
    phase: Math.random() * Math.PI * 2
  }));

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let f of flames) {
      const glow = 40 + 20 * Math.sin(f.phase);
      ctx.beginPath();
      let gradient = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius + glow);
      gradient.addColorStop(0, `rgba(255, 111, 97, ${f.alpha})`);
      gradient.addColorStop(1, 'rgba(255, 111, 97, 0)');
      ctx.fillStyle = gradient;
      ctx.arc(f.x, f.y, f.radius + glow, 0, Math.PI * 2);
      ctx.fill();

      f.y -= f.speedY;
      f.phase += 0.05;

      if (f.y < -f.radius - 50) {
        f.y = height + f.radius + 50;
        f.x = Math.random() * width;
        f.alpha = 0.1 + Math.random() * 0.3;
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