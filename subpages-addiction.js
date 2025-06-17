// subpages-addiction.js

const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
let orbs = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Orb {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = 8 + Math.random() * 12;
    this.opacity = 0.2 + Math.random() * 0.3;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.color = `rgba(255, ${150 + Math.random() * 100}, ${150 + Math.random() * 100}, ${this.opacity})`;
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < -this.size || this.x > canvas.width + this.size ||
        this.y < -this.size || this.y > canvas.height + this.size) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function createOrbs(count) {
  for (let i = 0; i < count; i++) {
    orbs.push(new Orb());
  }
}

function animateOrbs() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let orb of orbs) {
    orb.move();
    orb.draw();
  }
  requestAnimationFrame(animateOrbs);
}

createOrbs(80);
animateOrbs();

// Quick Exit logic
document.getElementById('quickExitBtn').addEventListener('click', () => {
  window.location.href = 'https://www.google.com';
});