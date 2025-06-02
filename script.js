 / Scroll Progress Bar
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
// Progress Bar
window.addEventListener("scroll", () => {
  const progress = document.getElementById("progress-bar");
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const progressHeight = (window.pageYOffset / totalHeight) * 100;
  progress.style.height = progressHeight + "%";
});

// Fade-in animation on scroll
const faders = document.querySelectorAll(".fade-in");
const appearOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("appear");
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Guestbook form handler
document.getElementById("guestbookForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  // Optionally, you can send data to a backend here
  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();

  if (message !== "") {
    document.getElementById("guestbookForm").style.display = "none";
    document.getElementById("thank-you-message").style.display = "block";
    console.log("Guestbook submission:", { name, message }); // Optional debug log
  }
});