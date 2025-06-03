// 🌗 Theme Toggle with Local Storage
const themeToggleBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', initialTheme);

themeToggleBtn?.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// 🎉 Sparkle Button (one-time sparkle)
document.getElementById('sparkle-button')?.addEventListener('click', (event) => {
  if (sparklesOn && typeof party !== "undefined") {
    party.confetti(event.target, {
      count: party.variation.range(20, 40),
      size: party.variation.range(0.6, 1.2),
      spread: 90,
    });
  }
});

// ✨ Sparkle Toggle (on/off)
const sparkleToggleBtn = document.getElementById('sparkle-btn');
let sparklesOn = true;

sparkleToggleBtn?.addEventListener('click', () => {
  sparklesOn = !sparklesOn;
  sparkleToggleBtn.textContent = sparklesOn ? "✨ Sparkles On" : "✨ Sparkles Off";
});

// 🔈 Background Music Toggle
const audio = document.getElementById("bg-music");
const audioBtn = document.getElementById("audio-btn");
let isPlaying = false;

audioBtn?.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    audioBtn.textContent = "🔈 Play";
  } else {
    audio.play();
    audioBtn.textContent = "🔇 Pause";
  }
  isPlaying = !isPlaying;
});

// 🧊 Fade-in Sections on Scroll
const fadeOutSections = document.querySelectorAll(".fade-out");

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.1
});

fadeOutSections.forEach(section => {
  fadeObserver.observe(section);
});