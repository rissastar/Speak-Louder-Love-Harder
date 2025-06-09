// script.js

document.addEventListener("DOMContentLoaded", () => {
  // Dark mode toggle with localStorage persistence
  const toggleBtn = document.querySelector(".toggle-dark");
  const body = document.body;

  // Initialize mode from localStorage
  const savedMode = localStorage.getItem("darkMode");
  if (savedMode === "enabled") {
    body.classList.add("dark");
    toggleBtn.textContent = "☀️ Light Mode";
  } else {
    toggleBtn.textContent = "🌙 Dark Mode";
  }

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
      toggleBtn.textContent = "☀️ Light Mode";
      localStorage.setItem("darkMode", "enabled");
    } else {
      toggleBtn.textContent = "🌙 Dark Mode";
      localStorage.setItem("darkMode", "disabled");
    }
  });

  // Collapsible nav for mobile
  const nav = document.querySelector("nav");
  const navToggleBtn = document.createElement("button");
  navToggleBtn.classList.add("nav-toggle");
  navToggleBtn.setAttribute("aria-label", "Toggle navigation menu");
  navToggleBtn.innerHTML = `
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
  `;
  nav.parentNode.insertBefore(navToggleBtn, nav);

  navToggleBtn.addEventListener("click", () => {
    nav.classList.toggle("nav-open");
    navToggleBtn.classList.toggle("open");
  });

  // Smooth scroll for nav links
  const navLinks = nav.querySelectorAll("a[href^='#'], a[href^='./']");
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      // For internal anchors, smooth scroll
      if (link.hash) {
        e.preventDefault();
        const target = document.querySelector(link.hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
        // Close nav on mobile after click
        if (nav.classList.contains("nav-open")) {
          nav.classList.remove("nav-open");
          navToggleBtn.classList.remove("open");
        }
      }
    });
  });

  // Animate summary icons on toggle open/close
  const summaries = document.querySelectorAll("details > summary");
  summaries.forEach(summary => {
    summary.addEventListener("click", () => {
      summary.classList.toggle("open");
    });
  });
});