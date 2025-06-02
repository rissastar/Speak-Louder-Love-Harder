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