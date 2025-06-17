// Setup animated background with subtle floating orbs in calming blue/purple tones

(() => {
  const canvas = document.getElementById('backgroundCanvas');
  const ctx = canvas.getContext('2d');
  let width, height;
  let orbs = [];
  const ORB_COUNT = 40;

  // Orb class for glowing circles that slowly float and pulse
  class Orb {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = 8 + Math.random() * 12;
      this.baseAlpha = 0.06 + Math.random() * 0.12;
      this.alpha = this.baseAlpha;
      this.alphaDirection = 1;
      this.speedX = (Math.random() - 0.5) * 0.12;
      this.speedY = (Math.random() - 0.5) * 0.12;
      this.pulseSpeed = 0.002 + Math.random() * 0.004;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x - this.radius > width) this.x = -this.radius;
      else if (this.x + this.radius < 0) this.x = width + this.radius;
      if (this.y - this.radius > height) this.y = -this.radius;
      else if (this.y + this.radius < 0) this.y = height + this.radius;

      // Pulse alpha between baseAlpha +/- 0.04
      this.alpha += this.alphaDirection * this.pulseSpeed;
      if (this.alpha > this.baseAlpha + 0.04) this.alphaDirection = -1;
      else if (this.alpha < this.baseAlpha - 0.04) this.alphaDirection = 1;
    }
    draw(ctx) {
      const gradient = ctx.createRadialGradient(
        this.x, this.y, this.radius * 0.3,
        this.x, this.y, this.radius
      );
      gradient.addColorStop(0, `rgba(100, 150, 255, ${this.alpha})`);
      gradient.addColorStop(1, `rgba(40, 60, 120, 0)`);

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function setupCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function initOrbs() {
    orbs = [];
    for (let i = 0; i < ORB_COUNT; i++) {
      orbs.push(new Orb());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    orbs.forEach(orb => {
      orb.update();
      orb.draw(ctx);
    });
    requestAnimationFrame(animate);
  }

  function saveNotes() {
    const textarea = document.querySelector('.notes-box');
    if (!textarea) return;
    const notes = textarea.value.trim();
    if (notes.length) {
      localStorage.setItem('supportNotes', notes);
      alert('Notes saved!');
    }
  }

  function loadNotes() {
    const textarea = document.querySelector('.notes-box');
    if (!textarea) return;
    const saved = localStorage.getItem('supportNotes');
    if (saved) textarea.value = saved;
  }

  function quickExit() {
    // Redirect user to Google as a neutral site
    window.location.href = 'https://www.google.com';
  }

  window.addEventListener('resize', () => {
    setupCanvas();
  });

  window.addEventListener('DOMContentLoaded', () => {
    setupCanvas();
    initOrbs();
    animate();
    loadNotes();

    const saveBtn = document.getElementById('saveNotesBtn');
    if (saveBtn) {
      saveBtn.addEventListener('click', saveNotes);
    }

    const quickExitBtn = document.getElementById('quickExitBtn');
    if (quickExitBtn) {
      quickExitBtn.addEventListener('click', quickExit);
    }
  });
})();