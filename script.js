// Scroll Progress Bar
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  const progressBar = document.getElementById("progress-bar");
  if (progressBar) {
    progressBar.style.width = scrollPercent + "%";
  }
});

// Scroll Fade-In Animation using Intersection Observer
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
fadeElements.forEach(el => observer.observe(el));

// Smooth Scroll for nav links
document.querySelectorAll('nav ul.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Pulse animation on button (optional - add pulse class to button element to use)
const pulseButtons = document.querySelectorAll('.button.pulse');
pulseButtons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.classList.add('pulse');
  });
  button.addEventListener('animationend', () => {
    button.classList.remove('pulse');
  });
});