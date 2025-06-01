document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Thank you for reaching out! We will get back to you soon.');
  this.reset();
});
document.getElementById('storyForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Future: send data to backend/form service here

  document.getElementById('storyConfirmation').style.display = 'block';
  this.reset();
});
const sidebar = document.getElementById("sidebar");
const toggle = document.querySelector(".nav-toggle");
const closeBtn = document.getElementById("closeSidebar");

toggle.addEventListener("click", () => {
  sidebar.classList.add("open");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("open");
});

// Optional: Close sidebar on link click
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("open");
  });
});