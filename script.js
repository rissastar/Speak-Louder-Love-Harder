// Scroll Progress Bar
const progressBar = document.getElementById('progress-bar');

function updateProgressBar() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = `${scrollPercent}%`;
}

window.addEventListener('scroll', updateProgressBar);
window.addEventListener('load', updateProgressBar);

// Fade-In on Scroll
const fadeEls = document.querySelectorAll('.fade-in');

function handleFadeInOnScroll() {
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    // Trigger fade-in when element is 80% visible from top
    if (rect.top < windowHeight * 0.8) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', handleFadeInOnScroll);
window.addEventListener('load', handleFadeInOnScroll);

// Add 'visible' class to fade elements initially for CSS fade-in
fadeEls.forEach(el => {
  if (!el.classList.contains('visible')) {
    el.classList.add('visible');
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const targetID = anchor.getAttribute('href').slice(1);
    const targetEl = document.getElementById(targetID);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
      targetEl.focus({ preventScroll: true });
    }
  });
});

// Typewriter effect (optional, but your CSS already does it)
// If you want JS-driven typing effect instead, you can implement here
// But since CSS handles it nicely, no extra JS needed here.

// Accessibility: Add focus styles for keyboard users
document.body.addEventListener('keydown', e => {
  if (e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing');
  }
});
document.body.addEventListener('mousedown', e => {
  document.body.classList.remove('user-is-tabbing');
});