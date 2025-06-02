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

// Fade-in Elements on Scroll
const fadeElements = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px"
});
fadeElements.forEach(el => fadeObserver.observe(el));

// Smooth Scroll for Nav Links
document.querySelectorAll('nav ul.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Pulse Button Animation (on hover)
document.querySelectorAll('.button.pulse').forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.classList.add('pulse-triggered');
  });
  button.addEventListener('animationend', () => {
    button.classList.remove('pulse-triggered');
  });
});

// Guestbook Form Handler
document.getElementById("guestbookForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();

  if (message !== "") {
    document.getElementById("guestbookForm").style.display = "none";
    document.getElementById("thank-you-message").style.display = "block";
    console.log("Guestbook submission:", { name, message });
  }
});