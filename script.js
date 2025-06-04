// ===== Elements =====
const themeToggleBtn = document.querySelector('#modeToggle'); // Updated to match your button ID
const body = document.body;
const backToTopBtn = document.getElementById('backToTop'); // Your HTML uses id="backToTop"
const progressBar = document.getElementById('progress-bar'); // Make sure you add this in HTML if you want progress bar
const magicLinks = document.querySelectorAll('.magic-link');
const faders = document.querySelectorAll('.fade-in-on-scroll');

// ===== THEME TOGGLE =====
function setTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    themeToggleBtn.textContent = '☀️'; // Sun icon for dark mode active
  } else {
    body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    themeToggleBtn.textContent = '🌙'; // Moon icon for light mode active
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

themeToggleBtn.addEventListener('click', () => {
  if (body.classList.contains('dark')) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
});

// ===== BACK TO TOP BUTTON & PROGRESS BAR =====
// Show/hide back to top button and update progress bar width on scroll
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  // Progress bar update (if progressBar element exists)
  if (progressBar) {
    progressBar.style.width = scrollPercent + '%';
  }

  // Back to top button toggle
  if (scrollTop > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== MAGIC LINKS STAGGERED FADE-IN =====
window.addEventListener('DOMContentLoaded', () => {
  magicLinks.forEach((link, index) => {
    link.style.opacity = '0';
    link.style.animation = `fadeIn 1.2s forwards`;
    link.style.animationDelay = `${0.3 + index * 0.15}s`;
  });
});

// ===== FADE-IN ON SCROLL =====
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

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});