// Elements
const modeToggleBtn = document.getElementById('modeToggle');
const body = document.body;
const progressBar = document.getElementById('progress-bar');
const backToTopBtn = document.getElementById('backToTop');
const faders = document.querySelectorAll('.fade-in-on-scroll');

// Toggle Dark/Light Mode with persistence
function setTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark');
    modeToggleBtn.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark');
    modeToggleBtn.textContent = '🌙';
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

// Event listener for theme toggle button
modeToggleBtn.addEventListener('click', () => {
  if (body.classList.contains('dark')) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
});

// Scroll event handler for progress bar and back-to-top button
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + '%';

  if (scrollTop > 300) {
    backToTopBtn.style.display = 'flex';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

// Back to top button click event
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// IntersectionObserver for fade-in on scroll
const appearOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});