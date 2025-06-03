const toggle = document.getElementById("theme-toggle");
const body = document.body;

toggle.addEventListener("click", () => {
  body.classList.toggle("light-theme");
});

toggle.addEventListener("keypress", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    body.classList.toggle("light-theme");
  }
});

// Optional: animate sections on scroll
const fadeSections = document.querySelectorAll("section.fade-out");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, {
  threshold: 0.2
});

fadeSections.forEach(section => observer.observe(section));