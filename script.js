// Scroll Progress Bar
window.onscroll = function () {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("progress-bar").style.width = scrolled + "%";
};

// Dark Mode Toggle
const toggle = document.getElementById("dark-mode-toggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  toggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// FAQ Collapse
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const faq = button.parentElement;
    faq.classList.toggle('open');
  });
});

// Image Slider
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

if (document.querySelector(".prev") && document.querySelector(".next")) {
  document.querySelector(".prev").addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  document.querySelector(".next").addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  showSlide(currentSlide); // Show first slide on load
}

// Voice/Audio Button
function playAudio() {
  const audio = document.getElementById("voiceClip");
  if (audio) {
    audio.play();
  }
}

// Story Share Submission
const storyButton = document.querySelector(".submit-story");
if (storyButton) {
  storyButton.addEventListener("click", () => {
    const text = document.querySelector(".story-share textarea").value.trim();
    if (text.length > 0) {
      alert("Thank you for sharing your story 💖");
      document.querySelector(".story-share textarea").value = "";
    } else {
      alert("Please write something before submitting.");
    }
  });
}