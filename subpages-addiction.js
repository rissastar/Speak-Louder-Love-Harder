// Animated flowing flame background + quick exit

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('backgroundCanvas');
  const ctx = canvas.getContext('2d');

  let width, height;
  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const flames = Array.from({ length: 50 }, () => ({
    x: Math.random() * width,
    y: height + Math.random() * 200,
    radius: 15 + Math.random() * 25,
    speedY: 0.5 + Math.random() * 1.5,
    alpha: 0.1 + Math.random() * 0.3,
    phase: Math.random() * Math.PI * 2
  }));

  function animateFlames() {
    ctx.clearRect(0, 0, width, height);

    for (let flame of flames) {
      const glow = 30 + 10 * Math.sin(flame.phase);
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(
        flame.x,
        flame.y,
        0,
        flame.x,
        flame.y,
        flame.radius + glow
      );
      gradient.addColorStop(0, `rgba(255, 111, 97, ${flame.alpha})`);
      gradient.addColorStop(1, 'rgba(255, 111, 97, 0)');
      ctx.fillStyle = gradient;
      ctx.arc(flame.x, flame.y, flame.radius + glow, 0, Math.PI * 2);
      ctx.fill();

      flame.y -= flame.speedY;
      flame.phase += 0.05;

      if (flame.y < -flame.radius) {
        flame.y = height + flame.radius;
        flame.x = Math.random() * width;
        flame.alpha = 0.1 + Math.random() * 0.3;
      }
    }

    requestAnimationFrame(animateFlames);
  }

  animateFlames();

  // Quick Exit button
  const quickExit = document.getElementById('quickExitBtn');
  if (quickExit) {
    quickExit.addEventListener('click', () => {
      window.location.href = 'https://www.google.com';
    });
  }
});