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
// Fade-In on Scroll
// ==============================
const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
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

// ==============================
// FAQ Toggle / Collapsible Sections
// ==============================
document.querySelectorAll(".faq-toggle").forEach(button => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;
    button.classList.toggle("active");
    content.classList.toggle("open");
  });
});

// ==============================
// Image Slider / Gallery (if used)
// ==============================
const slider = document.querySelector(".image-slider");
if (slider) {
  let currentIndex = 0;
  const slides = slider.querySelectorAll(".slide");
  const prev = document.querySelector(".prev-slide");
  const next = document.querySelector(".next-slide");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });
  }

  if (slides.length > 0) {
    showSlide(currentIndex);

    prev?.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    });

    next?.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    });
  }
}

// ==============================
// Voice Buttons for Audio Playback
// ==============================
document.querySelectorAll(".play-voice").forEach(button => {
  button.addEventListener("click", () => {
    const text = button.dataset.text;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  });
});

// ==============================
// Mobile Menu Toggle (if added)
// ==============================
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    menuToggle.classList.toggle("active");
  });
}

// ==============================
// Guestbook / Contact Auto Focus
// ==============================
window.addEventListener("DOMContentLoaded", () => {
  const guestbookInput = document.querySelector("#guest-name, #message, .auto-focus");
  if (guestbookInput) {
    guestbookInput.focus();
  }
});