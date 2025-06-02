// Fade-in elements when scrolled into view
function fadeInOnScroll() {
  const elements = document.querySelectorAll('.fade-in');
  const windowBottom = window.innerHeight;

  elements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowBottom - 100) {
      el.classList.add('visible');
    }
  });
}

// Scroll progress bar
function updateProgressBar() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
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
      toggleBtn.textContent = '☀️ Light Mode';
      localStorage.setItem('darkMode', 'enabled');
    } else {
      toggleBtn.textContent = '🌙 Dark Mode';
      localStorage.removeItem('darkMode');
    }
  });
}

// Collapsible stories toggle
function initCollapsibles() {
  const collapsibles = document.querySelectorAll('.collapsible');
  collapsibles.forEach(button => {
    // Initialize aria-expanded attribute
    button.setAttribute('aria-expanded', 'false');

    button.addEventListener('click', () => {
      button.classList.toggle('active');
      const content = button.nextElementSibling;
      if (!content) return;

      if (button.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.paddingTop = "10px";
        content.style.paddingBottom = "10px";
        button.setAttribute('aria-expanded', 'true');
      } else {
        content.style.maxHeight = null;
        content.style.paddingTop = "0";
        content.style.paddingBottom = "0";
        button.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// Mental health condition details toggle (only one open at a time)
function initDetailsToggle() {
  const details = document.querySelectorAll("#mental-health-conditions details");
  details.forEach(targetDetail => {
    targetDetail.addEventListener("toggle", () => {
      if (targetDetail.open) {
        details.forEach(detail => {
          if (detail !== targetDetail) detail.removeAttribute("open");
        });
      }
    });
  });
}

// Tab buttons logic
function initTabs() {
  const tabSets = document.querySelectorAll(".tab-buttons");
  tabSets.forEach(set => {
    const buttons = set.querySelectorAll("button");
    const contents = set.parentElement.querySelectorAll(".tab-content");

    buttons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));

        btn.classList.add("active");
        if(contents[index]) contents[index].classList.add("active");
      });
    });

    // Set first tab active by default
    if (buttons.length > 0) {
      buttons[0].click();
    }
  });
}

// Initialize all on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  fadeInOnScroll();
  updateProgressBar();

  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }

  // Sync toggle button text to current mode on load
  if (toggleBtn) {
    if (document.body.classList.contains('dark-mode')) {
      toggleBtn.textContent = '☀️ Light Mode';
    } else {
      toggleBtn.textContent = '🌙 Dark Mode';
    }
  }

  initCollapsibles();
  initDetailsToggle();
  initTabs();
});

// Also listen for scroll events
window.addEventListener('scroll', () => {
  fadeInOnScroll();
  updateProgressBar();
});
// Dark Mode Toggle 🌙
const darkToggle = document.getElementById('dark-mode-toggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Collapsible Sections (FAQ-like)
document.querySelectorAll('.collapsible').forEach(button => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;
    content.classList.toggle('active');
    button.classList.toggle('active');
  });
});

// Tabs Inside <details>
document.querySelectorAll('.tab-buttons').forEach(buttonGroup => {
  const buttons = buttonGroup.querySelectorAll('button');
  const tabContents = buttonGroup.parentElement.querySelectorAll('.tab-content');

  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(tab => tab.style.display = 'none');

      btn.classList.add('active');
      tabContents[index].style.display = 'block';
    });

    if (index === 0) btn.click(); // Set default active tab
  });
});