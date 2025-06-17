// Grief & Loss – Floating Orbs Animation + Quick Exit

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

  // Orbs
  const orbs = Array.from({ length: 30 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: 10 + Math.random() * 20,
    speedY: 0.2 + Math.random() * 0.4,
    alpha: 0.05 + Math.random() * 0.1
  }));

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let orb of orbs) {
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 192, 203, ${orb.alpha})`;
      ctx.fill();
      orb.y += orb.speedY;
      if (orb.y > height + orb.radius) {
        orb.y = -orb.radius;
        orb.x = Math.random() * width;
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