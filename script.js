// ==============================
// Scroll Progress Bar
// ==============================
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (scrollTop / docHeight) * 100;
  const progressBar = document.getElementById("progress-bar");
  if (progressBar) {
    progressBar.style.width = scrolled + "%";
  }
});

// ==============================
// Typewriter Effect
// ==============================
const typewriter = document.querySelector(".typewriter");

if (typewriter) {
  const text = typewriter.textContent.trim();
  typewriter.textContent = "";
  let i = 0;

  const type = () => {
    if (i < text.length) {
      typewriter.textContent += text.charAt(i);
      i++;
      setTimeout(type, 60);
    }
  };

  type();
}

// ==============================
// Fade-In On Scroll
// ==============================
const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // only once
      }
    });
  },
  { threshold: 0.25 }
);

fadeElements.forEach(el => observer.observe(el));

// ==============================
// Smooth Scroll for Anchor Links
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetID = this.getAttribute("href").substring(1);
    const target = document.getElementById(targetID);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});