document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  // Elements
  const themeToggleBtn = document.getElementById('modeToggle');
  const backToTopBtn = document.getElementById('backToTop');
  const progressBar = document.getElementById('progress-bar');
  const faders = document.querySelectorAll('.fade-in-on-scroll');

  // Set theme: 'dark' or 'light'
  function setTheme(theme) {
    if (theme === 'dark') {
      body.classList.add('dark');
      themeToggleBtn.textContent = '☀️'; // sun icon for light mode
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark');
      themeToggleBtn.textContent = '🌙'; // moon icon for dark mode
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

  // Theme toggle button click
  themeToggleBtn.addEventListener('click', () => {
    if (body.classList.contains('dark')) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  });

  // Back to top button click
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Show/hide back to top and update progress bar on scroll
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    // Update progress bar width
    if (progressBar) {
      progressBar.style.width = scrollPercent + '%';
    }

    // Toggle back to top button visibility
    if (scrollTop > 300) {
      backToTopBtn.style.display = 'flex';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });

  // Fade-in on scroll using IntersectionObserver
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
});