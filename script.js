// 🌗 Theme Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const root = document.documentElement;

// Check and apply saved or system theme
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
root.setAttribute('data-theme', currentTheme);

// Toggle between light and dark mode
themeToggleBtn?.addEventListener('click', () => {
  const newTheme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// ✨ Sparkle Button
const sparkleBtn = document.getElementById('sparkle-button');
sparkleBtn?.addEventListener('click', (event) => {
  party.confetti(event.target, {
    count: party.variation.range(20, 40),
    size: party.variation.range(0.6, 1.2),
    spread: 90,
  });
});

// ✨ Sparkle Toggle (Optional Sparkle Trigger Button)
const sparkleToggleBtn = document.getElementById('sparkle-btn');
sparkleToggleBtn?.addEventListener('click', () => {
  party.confetti(sparkleToggleBtn, {
    count: party.variation.range(15, 30),
    spread: 70,
    size: party.variation.range(0.5, 1.1),
  });
});

// 🔈 Audio Controls
const audioBtn = document.getElementById('audio-btn');
const audio = document.getElementById('bg-music');

audioBtn?.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    audioBtn.textContent = '🔇 Pause';
  } else {
    audio.pause();
    audioBtn.textContent = '🔈 Play';
  }
});

// 📜 Fade-In on Scroll
const fadeElements = document.querySelectorAll('.fade-out');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Optional: observe once
      }
    });
  },
  {
    threshold: 0.1,
  }
);

fadeElements.forEach((el) => observer.observe(el));