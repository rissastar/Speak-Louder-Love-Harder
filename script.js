// Scroll Progress Bar (width-based)
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  const progressBar = document.getElementById("progress-bar");
  if (progressBar) {
    progressBar.style.width = scrollPercent + "%";
  }
});

// Fade-in animation using Intersection Observer
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

// Smooth scroll for internal nav links
document.querySelectorAll('nav ul.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Pulse animation (optional)
const pulseButtons = document.querySelectorAll('.button.pulse');
pulseButtons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.classList.add('pulse');
  });
  button.addEventListener('animationend', () => {
    button.classList.remove('pulse');
  });
});

// Guestbook form handler
const guestbookForm = document.getElementById("guestbookForm");
if (guestbookForm) {
  guestbookForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();

    if (message !== "") {
      guestbookForm.style.display = "none";
      document.getElementById("thank-you-message").style.display = "block";
      console.log("Guestbook submission:", { name, message });
    }
  });
}