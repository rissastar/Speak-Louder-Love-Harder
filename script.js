// Theme toggler with rotation animation
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(dark) {
  if (dark) {
    body.classList.add('dark');
    toggleBtn.textContent = '☀️';
  } else {
    body.classList.remove('dark');
    toggleBtn.textContent = '🌙';
  }
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

// Load theme from localStorage or system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme === 'dark');
} else {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(prefersDark);
}

// Animate theme toggle rotation on click then toggle theme
toggleBtn.addEventListener('click', () => {
  toggleBtn.classList.add('rotate');
  setTimeout(() => {
    const isDark = body.classList.contains('dark');
    setTheme(!isDark);
    toggleBtn.classList.remove('rotate');
  }, 500);
});

// Scroll fade-in animation for topics grid articles
const articles = document.querySelectorAll('.topics-grid article');

function animateOnScroll() {
  const triggerBottom = window.innerHeight * 0.9;

  articles.forEach((article, index) => {
    const articleTop = article.getBoundingClientRect().top;

    if (articleTop < triggerBottom) {
      // Add animation with stagger delay
      article.style.animationName = 'fadeInUp';
      article.style.animationDelay = `${index * 0.15}s`;
      article.style.opacity = 1;
      article.style.transform = 'translateY(0)';
    }
  });
}

// Animate on load and on scroll
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);