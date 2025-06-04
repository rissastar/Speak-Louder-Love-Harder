// Theme Toggle Function
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('preferredTheme', newTheme);
}

// On Page Load, Set Preferred Theme
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('preferredTheme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
});

// Optional: Smooth Scroll Polyfill Fallback (if needed)
if ('scrollBehavior' in document.documentElement.style === false) {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
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

// Optional: Alert on form submission (guestbook/contact page)
document.addEventListener('submit', (e) => {
  const form = e.target;
  if (form.matches('.alert-on-submit')) {
    e.preventDefault(); // prevent real submission for now
    alert('Thank you for reaching out! 💖 Your message has been received.');
    form.reset();
  }
});