// Smooth Section Highlighting on Scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll('nav a').forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// Optional: Fade-in animations on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-visible');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.fade-in').forEach(element => {
  observer.observe(element);
});

// Example: Mobile menu toggle (optional, use if adding a hamburger icon later)
document.querySelectorAll('.menu-toggle')?.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('open');
  });
});