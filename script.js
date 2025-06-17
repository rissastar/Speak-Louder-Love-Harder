// Panic modal open/close logic
const panicModal = document.getElementById('panicModal');
const openPanicBtn = document.getElementById('openPanicModal');
const closePanicBtn = document.getElementById('closePanicModal');
const exitButton = document.getElementById('exitButton');

openPanicBtn.addEventListener('click', () => {
  panicModal.classList.remove('hidden');
});

closePanicBtn.addEventListener('click', () => {
  panicModal.classList.add('hidden');
});

exitButton.addEventListener('click', () => {
  // Redirect user quietly to a neutral site
  window.location.href = 'https://www.google.com';
});

// Register the service worker for PWA offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('Service Worker registered.', reg))
      .catch(err => console.log('Service Worker registration failed:', err));
  });
}
// Quick Exit functionality
const quickExit = document.getElementById('quickExitBtn');
if (quickExit) {
  quickExit.addEventListener('click', () => {
    window.location.href = 'https://www.google.com';
  });
}

// Starfield background animation
const canvas = document.getElementById('bgCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let stars = [];
  let width, height;

  function initStars() {
    stars = [];
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2,
        alpha: Math.random(),
        dAlpha: 0.01 + Math.random() * 0.02
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, width, height);
    for (const star of stars) {
      star.alpha += star.dAlpha;
      if (star.alpha <= 0 || star.alpha >= 1) star.dAlpha *= -1;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255, 111, 163, ${star.alpha})`;
      ctx.shadowColor = '#ff6fa3';
      ctx.shadowBlur = 5;
      ctx.fill();
    }
    requestAnimationFrame(drawStars);
  }

  window.addEventListener('resize', initStars);
  initStars();
  drawStars();
}