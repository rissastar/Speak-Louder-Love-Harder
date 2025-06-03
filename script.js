// Dark/Light Theme Toggle
const themeToggleBtn = document.querySelector('.theme-toggle');
const body = document.body;

function setTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}

// Initialize theme from localStorage or system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  setTheme('dark');
}

themeToggleBtn.addEventListener('click', () => {
  if (body.classList.contains('dark')) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
});

// Progress Bar on scroll
const progressBar = document.getElementById('progress-bar');
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + '%';

  // Back to top button show/hide
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

// Fade-in Sections on scroll
const faders = document.querySelectorAll('.fade-in-on-scroll');

const appearOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Animated sliding underline on nav links (.magic-link)
const nav = document.querySelector('nav');
const navLinks = nav.querySelectorAll('a.magic-link');
const navUnderline = nav.querySelector('.nav-underline');

// Initialize underline position and style on first link
function updateUnderline(el) {
  const rect = el.getBoundingClientRect();
  const navRect = nav.getBoundingClientRect();
  navUnderline.style.width = rect.width + 'px';
  navUnderline.style.left = (rect.left - navRect.left) + 'px';
  navUnderline.style.backgroundColor = getComputedStyle(el).color;
}

if (navLinks.length > 0) {
  updateUnderline(navLinks[0]);
}

navLinks.forEach(link => {
  link.addEventListener('mouseenter', (e) => {
    updateUnderline(e.target);
  });
  link.addEventListener('focus', (e) => {
    updateUnderline(e.target);
  });
});

nav.addEventListener('mouseleave', () => {
  // Reset underline to first magic link
  updateUnderline(navLinks[0]);
});