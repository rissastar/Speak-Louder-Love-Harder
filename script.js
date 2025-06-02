// script.js

// Fade-in elements when scrolled into view
function fadeInOnScroll() {
  const elements = document.querySelectorAll('.fade-in');
  const windowBottom = window.innerHeight;

  elements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowBottom - 100) { // 100px offset
      el.classList.add('visible');
    }
  });
}

// Scroll progress bar
function updateProgressBar() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    progressBar.style.width = scrollPercent + '%';
  }
}

// Dark mode toggle logic
const toggleBtn = document.getElementById('dark-mode-toggle');
if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
    } else {
      localStorage.removeItem('darkMode');
    }
  });
}

// Collapsible stories toggle
function initCollapsibles() {
  const collapsibles = document.querySelectorAll('.collapsible');
  collapsibles.forEach(button => {
    button.addEventListener('click', () => {
      button.classList.toggle('active');

      const content = button.nextElementSibling;
      if (!content) return; // safety check

      if (button.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.paddingTop = "10px";
        content.style.paddingBottom = "10px";
      } else {
        content.style.maxHeight = null;
        content.style.paddingTop = "0";
        content.style.paddingBottom = "0";
      }
    });
  });
}

// On page load
window.addEventListener('load', () => {
  fadeInOnScroll();

  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }
  updateProgressBar();

  initCollapsibles();  // Initialize collapsibles here
});

// On scroll
window.addEventListener('scroll', () => {
  fadeInOnScroll();
  updateProgressBar();
});
  document.addEventListener("DOMContentLoaded", () => {
      const details = document.querySelectorAll("#mental-health-conditions details");
      details.forEach((targetDetail) => {
        targetDetail.addEventListener("toggle", () => {
          if (targetDetail.open) {
            details.forEach((detail) => {
              if (detail !== targetDetail) detail.removeAttribute("open");
            });
          }
        });
      });

      const tabSets = document.querySelectorAll(".tab-buttons");
      tabSets.forEach(set => {
        const buttons = set.querySelectorAll("button");
        const contents = set.parentElement.querySelectorAll(".tab-content");
        buttons.forEach((btn, index) => {
          btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            contents.forEach(c => c.classList.remove("active"));
            btn.classList.add("active");
            contents[index].classList.add("active");
          });
        });
        // Set first tab active by default
        if (buttons.length > 0) {
          buttons[0].click();
        }
      });
    });
  </script>
<section id="mental-health-conditions">
  <h2>🧠 Types of Mental Health Conditions</h2>

  <style>
    #mental-health-conditions {
      padding: 1em;
      max-width: 800px;
      margin: auto;
    }

    #mental-health-conditions details {
      margin-bottom: 1em;
      border: 1px solid #ccc;
      border-radius: 8px;
      overflow: hidden;
    }

    #mental-health-conditions summary {
      font-size: 1.2em;
      cursor: pointer;
      padding: 0.6em;
      background-color: #f0f0f0;
      border-bottom: 1px solid #ddd;
    }

    #mental-health-conditions details[open] summary {
      background-color: #d0eaff;
    }

    .tab-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5em;
      margin: 1em 0;
    }

    .tab-buttons button {
      padding: 0.4em 1em;
      border: none;
      border-radius: 6px;
      background-color: #eee;
      cursor: pointer;
      font-weight: bold;
    }

    .tab-buttons button.active {
      background-color: #2196F3;
      color: white;
    }

    .tab-content {
      display: none;
      margin-left: 1em;
      padding-bottom: 1em;
    }

    .tab-content.active {
      display: block;
    }

    .tab-content ul {
      margin-top: 0.5em;
      margin-left: 1em;
      list-style-type: disc;
    }
  </style