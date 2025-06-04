// Theme Toggle Function
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('preferredTheme', newTheme);
}

// On Page Load, Set Preferred Theme (with OS preference fallback)
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('preferredTheme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }

  // Setup theme toggle button event
  const themeToggleBtn = document.querySelector('.theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Initialize navbar underline position on page load
  initNavUnderline();

  // Reveal on scroll initially
  revealOnScroll();

  // Shrink header if page is already scrolled
  toggleHeaderShrink();
});

// Animated navbar underline logic
const navUnderline = document.querySelector('.nav-underline');
const navLinks = document.querySelectorAll('.navbar a.nav-link');

function initNavUnderline() {
  if (!navUnderline || navLinks.length === 0) return;

  // Place underline under the first link on load
  moveUnderline(navLinks[0]);

  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => moveUnderline(link));
  });

  // Reset underline on mouse leave from nav container
  const navbar = document.querySelector('.navbar');
  navbar.addEventListener('mouseleave', () => moveUnderline(navLinks[0]));
}

function moveUnderline(link) {
  if (!link || !navUnderline) return;
  const rect = link.getBoundingClientRect();
  const navRect = link.closest('.navbar').getBoundingClientRect();

  navUnderline.style.width = `${rect.width}px`;
  navUnderline.style.left = `${rect.left - navRect.left}px`;
  navUnderline.style.opacity = '1';
}

// Scroll-triggered header shrink and sticky nav shadow
const header = document.querySelector('.site-header');
const navbar = document.querySelector('.navbar');

function toggleHeaderShrink() {
  if (!header) return;
  if (window.scrollY > 50) {
    header.classList.add('shrunk');
  } else {
    header.classList.remove('shrunk');
  }
}

function toggleNavbarShadow() {
  if (!navbar) return;
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// Scroll reveal elements
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

// Event listeners for scroll
window.addEventListener('scroll', () => {
  toggleHeaderShrink();
  toggleNavbarShadow();
  revealOnScroll();
});

// Optional: Alert on form submission (use .alert-on-submit class in forms)
document.addEventListener('submit', (e) => {
  const form = e.target;
  if (form.matches('.alert-on-submit')) {
    e.preventDefault(); // prevent real submission for now
    launchConfetti();
    alert('Thank you for reaching out! 💖 Your message has been received.');
    form.reset();
  }
});

// Confetti celebration (requires canvas-confetti from CDN)
function launchConfetti() {
  const duration = 2 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
}

// Smooth scroll fallback for older browsers (optional)
if ('scrollBehavior' in document.documentElement.style === false) {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}