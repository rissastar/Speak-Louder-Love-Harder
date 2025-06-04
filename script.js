// =========================
// Theme Toggle
// =========================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Apply saved theme on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
}

// Toggle theme
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', currentTheme);
});

// =========================
// Smooth Scrolling
// =========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// =========================
// Scroll Animations
// =========================
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.animate');
  const triggerBottom = window.innerHeight * 0.85;

  elements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.classList.add('show');
    } else {
      el.classList.remove('show');
    }
  });
};

// Trigger on scroll and load
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// =========================
// Mobile Nav Toggle Support (Optional future use)
// =========================
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav-open');
  });
}