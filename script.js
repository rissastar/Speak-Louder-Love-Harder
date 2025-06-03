// 🌙 Theme Toggle with Detection + Image Swap
const themeBtn = document.getElementById('theme-btn');
const storedTheme = localStorage.getItem('theme');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

if (storedTheme === 'light' || (!storedTheme && prefersLight)) {
  document.body.classList.add('light-theme');
  switchThemeImages('light');
} else {
  switchThemeImages('dark');
}

themeBtn.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light-theme');
  const theme = isLight ? 'light' : 'dark';
  localStorage.setItem('theme', theme);
  switchThemeImages(theme);
});

function switchThemeImages(theme) {
  document.querySelectorAll('[data-theme-src]').forEach(img => {
    const src = img.getAttribute(`data-src-${theme}`);
    if (src) img.src = src;
  });
}

// 🌐 Fade-in on Load
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('fade-in');
});

// 🎧 Background Audio Toggle
const audioBtn = document.getElementById('audio-btn');
const bgAudio = document.getElementById('bg-music');
let playing = false;

audioBtn.addEventListener('click', () => {
  if (playing) {
    bgAudio.pause();
    audioBtn.textContent = '🔈 Play';
  } else {
    bgAudio.play();
    audioBtn.textContent = '🔇 Pause';
  }
  playing = !playing;
});

// ✨ Sparkle Toggle
const sparkleBtn = document.getElementById('sparkle-btn');
let sparklesEnabled = localStorage.getItem('sparkles') !== 'off';

function updateSparkleButton() {
  sparkleBtn.textContent = sparklesEnabled ? '✨ Sparkles On' : '✨ Sparkles Off';
}
updateSparkleButton();

sparkleBtn.addEventListener('click', () => {
  sparklesEnabled = !sparklesEnabled;
  localStorage.setItem('sparkles', sparklesEnabled ? 'on' : 'off');
  updateSparkleButton();
});

// 💖 Floating Hearts on Click
document.addEventListener('click', function (e) {
  if (!sparklesEnabled) return;

  const heart = document.createElement('div');
  heart.textContent = '💖';
  heart.style.position = 'fixed';
  heart.style.left = `${e.clientX}px`;
  heart.style.top = `${e.clientY}px`;
  heart.style.fontSize = '1.8rem';
  heart.style.opacity = 1;
  heart.style.pointerEvents = 'none';
  heart.style.zIndex = 9999;
  document.body.appendChild(heart);

  let rise = 0;
  const anim = setInterval(() => {
    rise += 2;
    heart.style.top = `${e.clientY - rise}px`;
    heart.style.opacity -= 0.02;
    if (heart.style.opacity <= 0) {
      clearInterval(anim);
      heart.remove();
    }
  }, 16);
});

// 🌈 Emoji Trail on Mouse Move
let trailIndex = 0;
const trailEmojis = ['✨', '💫', '🌈', '💜', '💖'];

document.addEventListener('mousemove', function (e) {
  if (!sparklesEnabled) return;

  const sparkle = document.createElement('div');
  sparkle.textContent = trailEmojis[trailIndex % trailEmojis.length];
  trailIndex++;

  sparkle.style.position = 'fixed';
  sparkle.style.left = `${e.clientX}px`;
  sparkle.style.top = `${e.clientY}px`;
  sparkle.style.fontSize = '1.2rem';
  sparkle.style.opacity = 1;
  sparkle.style.pointerEvents = 'none';
  sparkle.style.zIndex = 9999;
  document.body.appendChild(sparkle);

  let float = 0;
  const sparkleAnim = setInterval(() => {
    float++;
    sparkle.style.top = `${e.clientY - float}px`;
    sparkle.style.opacity -= 0.03;
    if (sparkle.style.opacity <= 0) {
      clearInterval(sparkleAnim);
      sparkle.remove();
    }
  }, 16);
});