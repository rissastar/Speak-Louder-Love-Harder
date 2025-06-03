// script.js for Speak Louder, Love Harder website
(function() {
  // your mental-health.js code here
})();

document.addEventListener("DOMContentLoaded", () => {
  // 1. Smooth scrolling for nav links (for topic sections)
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetID = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetID);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
      // Close mobile menu if open
      closeMobileMenu();
    });
  });

  // 2. Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }
  function closeMobileMenu() {
    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  }

  // 3. Fade in topic sections on scroll
  const fadeElems = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  fadeElems.forEach(elem => observer.observe(elem));

  // 4. Guestbook Connect functionality
  const guestbookForm = document.getElementById("guestbook-form");
  const guestbookList = document.getElementById("guestbook-list");

  // Load saved guestbook messages from localStorage
  let guestbookMessages = JSON.parse(localStorage.getItem("guestbookMessages")) || [];
  renderGuestbookMessages();

  if (guestbookForm) {
    guestbookForm.addEventListener("submit", e => {
      e.preventDefault();

      const nameInput = guestbookForm.querySelector('input[name="name"]');
      const messageInput = guestbookForm.querySelector('textarea[name="message"]');

      // Simple validation
      if (!nameInput.value.trim() || !messageInput.value.trim()) {
        showGuestbookFeedback("Please enter both your name and a message.", "error");
        return;
      }

      const newMessage = {
        id: Date.now(),
        name: nameInput.value.trim(),
        message: messageInput.value.trim(),
        timestamp: new Date().toISOString()
      };

      guestbookMessages.push(newMessage);
      localStorage.setItem("guestbookMessages", JSON.stringify(guestbookMessages));
      renderGuestbookMessages();

      guestbookForm.reset();
      showGuestbookFeedback("Thank you for your message!", "success");
    });
  }

  // Render messages to guestbookList element
  function renderGuestbookMessages() {
    if (!guestbookList) return;
    guestbookList.innerHTML = "";

    if (guestbookMessages.length === 0) {
      guestbookList.innerHTML = "<p>No messages yet. Be the first to connect!</p>";
      return;
    }

    guestbookMessages
      .slice()
      .reverse() // newest first
      .forEach(msg => {
        const msgElem = document.createElement("div");
        msgElem.className = "guestbook-message";

        msgElem.innerHTML = `
          <p class="guestbook-name">${escapeHTML(msg.name)}</p>
          <p class="guestbook-text">${escapeHTML(msg.message)}</p>
          <p class="guestbook-time">${new Date(msg.timestamp).toLocaleString()}</p>
        `;

        guestbookList.appendChild(msgElem);
      });
  }

  // Feedback display for guestbook form
  function showGuestbookFeedback(msg, type) {
    let feedback = document.getElementById("guestbook-feedback");
    if (!feedback) {
      feedback = document.createElement("div");
      feedback.id = "guestbook-feedback";
      feedback.style.marginTop = "0.5em";
      const form = document.getElementById("guestbook-form");
      form.appendChild(feedback);
    }
    feedback.textContent = msg;
    feedback.className = type; // style with CSS for .error and .success
  }

  // Utility: simple escape HTML to prevent XSS
  function escapeHTML(str) {
    return str.replace(/[&<>"']/g, function(m) {
      return ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[m];
    });
  }
});