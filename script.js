// Elements
const header = document.querySelector('header');
const backToTopBtn = document.getElementById('backToTop');
const modeToggleBtn = document.getElementById('modeToggle');
const body = document.body;

// === Dark/Light Theme Toggle ===
function setTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark');
    modeToggleBtn.textContent = '☀️'; // sun icon
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark');
    modeToggleBtn.textContent = '🌙'; // moon icon
    localStorage.setItem('theme', 'light');
  }
}

// Initialize theme from localStorage or system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  setTheme('dark');
} else {
  setTheme('light');
}

modeToggleBtn.addEventListener('click', () => {
  if (body.classList.contains('dark')) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
});

// === Header scroll effect & Back-to-top button ===
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Shrink header and add shadow after scrolling 50px
  if (scrollY > 50) {
    header.classList.add('header-scrolled');
  } else {
    header.classList.remove('header-scrolled');
  }

  // Show back-to-top button after 300px
  if (scrollY > 300) {
    backToTopBtn.style.display = 'flex';
    backToTopBtn.style.opacity = '1';
  } else {
    backToTopBtn.style.opacity = '0';
    // Use timeout to delay display:none until fade out ends
    setTimeout(() => {
      if (window.scrollY <= 300) backToTopBtn.style.display = 'none';
    }, 300);
  }
});

// Smooth scroll to top on button click
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// === Fade-in sections on scroll ===
const faders = document.querySelectorAll('.fade-in-on-scroll');
const appearOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));