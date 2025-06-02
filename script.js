// --- Fade-in elements on scroll ---
function fadeInOnScroll() {
  const elements = document.querySelectorAll('.fade-in');
  const windowBottom = window.innerHeight;

  elements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowBottom - 100) {
      el.classList.add('visible');
    }
  });
}

// --- Scroll progress bar ---
function updateProgressBar() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    progressBar.style.width = scrollPercent + '%';
  }
}

// --- Dark Mode Toggle ---
function initDarkModeToggle() {
  const toggleBtn = document.getElementById('dark-mode-toggle');
  if (!toggleBtn) return;

  // Initialize state
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    toggleBtn.textContent = '☀️ Light Mode';
  } else {
    toggleBtn.textContent = '🌙 Dark Mode';
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    toggleBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
  });
}

// --- Init on Load ---
document.addEventListener('DOMContentLoaded', () => {
  fadeInOnScroll();
  updateProgressBar();
  initDarkModeToggle();
});

// --- Scroll Events ---
window.addEventListener('scroll', () => {
  fadeInOnScroll();
  updateProgressBar();
});