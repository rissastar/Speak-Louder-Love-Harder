// Scroll progress bar
window.onscroll = () => {
  const progressBar = document.getElementById('progress-bar');
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + "%";
};

// Dark mode toggle
document.getElementById('dark-mode-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Confetti click 🎉
document.body.addEventListener('click', (e) => {
  const confetti = document.createElement('div');
  confetti.classList.add('confetti');
  confetti.style.left = `${e.clientX}px`;
  confetti.style.top = `${e.clientY}px`;
  document.body.appendChild(confetti);

  setTimeout(() => confetti.remove(), 1500);
});

// Confetti CSS
const style = document.createElement('style');
style.innerHTML = `
.confetti {
  position: fixed;
  width: 8px;
  height: 8px;
  background: hsl(${Math.random() * 360}, 100%, 60%);
  animation: confetti-fall 1.5s linear;
  border-radius: 50%;
  pointer-events: none;
  z-index: 1000;
}

@keyframes confetti-fall {
  0% { transform: translateY(0) rotate(0); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}
`;
document.head.appendChild(style);