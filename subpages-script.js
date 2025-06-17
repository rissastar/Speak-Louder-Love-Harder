// Ripple background for addiction theme
const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let ripples = [];

function createRipple() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const radius = 0;
  const maxRadius = 80 + Math.random() * 80;
  ripples.push({ x, y, radius, maxRadius });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0d0d0d";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ripples.forEach((r, i) => {
    r.radius += 0.7;
    if (r.radius > r.maxRadius) {
      ripples.splice(i, 1);
      return;
    }
    ctx.beginPath();
    ctx.arc(r.x, r.y, r.radius, 0, 2 * Math.PI);
    ctx.strokeStyle = `rgba(109, 191, 158, ${1 - r.radius / r.maxRadius})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  requestAnimationFrame(animate);
}
setInterval(createRipple, 700);
animate();

// Quick Exit Button
document.getElementById("quickExitBtn").addEventListener("click", () => {
  window.location.href = "https://www.google.com";
});