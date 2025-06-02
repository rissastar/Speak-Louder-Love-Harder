// --- Fade-in elements on scroll ---
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

// --- Scroll progress bar ---
function updateProgressBar() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    progressBar.style.width = scrollPercent + '%';
  }
}

// --- Dark Mode Toggle ---
function initDarkModeToggle() {
  const toggleBtn = document.getElementById('dark-mode-toggle');
  if (!toggleBtn) return;

  // Load saved mode
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    toggleBtn.textContent = '☀️ Light Mode';
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    toggleBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    localStorage.setItem('darkMode', isDark ? 'enabled' : '');
  });
}

// --- Collapsibles (e.g. Explore Topics) ---
function initCollapsibles() {
  const collapsibles = document.querySelectorAll('.collapsible');
  collapsibles.forEach(button => {
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => {
      button.classList.toggle('active');
      const content = button.nextElementSibling;
      if (!content) return;
      if (button.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.padding = '10px 0';
        button.setAttribute('aria-expanded', 'true');
      } else {
        content.style.maxHeight = null;
        content.style.padding = '0';
        button.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// --- <details> toggle so only one stays open ---
function initDetailsToggle() {
  const detailsList = document.querySelectorAll('details');
  detailsList.forEach(target => {
    target.addEventListener('toggle', () => {
      if (target.open) {
        detailsList.forEach(other => {
          if (other !== target) other.removeAttribute('open');
        });
      }
    });
  });
}

// --- Tab behavior inside <details> sections ---
function initTabs() {
  const tabGroups = document.querySelectorAll('.tab-buttons');
  tabGroups.forEach(group => {
    const buttons = group.querySelectorAll('button');
    const contents = group.parentElement.querySelectorAll('.tab-content');

    buttons.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        contents.forEach(c => c.style.display = 'none');

        btn.classList.add('active');
        contents[i].style.display = 'block';
      });

      if (i === 0) btn.click(); // Default to first tab
    });
  });
}

// --- Run on load ---
document.addEventListener('DOMContentLoaded', () => {
  fadeInOnScroll();
  updateProgressBar();
  initDarkModeToggle();
  initCollapsibles();
  initDetailsToggle();
  initTabs();
});

// --- Run on scroll ---
window.addEventListener('scroll', () => {
  fadeInOnScroll();
  updateProgressBar();
});
// Accordion: Only one disorder open at a time
function initDetailsToggle() {
  const detailsList = document.querySelectorAll('#mental-health-conditions .collapsible-content > details');

  detailsList.forEach((detail) => {
    detail.addEventListener('toggle', () => {
      if (detail.open) {
        detailsList.forEach((other) => {
          if (other !== detail) other.removeAttribute('open');
        });
      }
    });
  });
}

// Tab functionality within each disorder
function initDisorderTabs() {
  const allTabGroups = document.querySelectorAll('#mental-health-conditions .tab-buttons');

  allTabGroups.forEach((tabGroup) => {
    const buttons = tabGroup.querySelectorAll('button');
    const tabContents = tabGroup.parentElement.querySelectorAll('.tab-content');

    buttons.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        // Toggle active tab button
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        // Show corresponding tab content
        tabContents.forEach((c, index) => {
          c.style.display = index === i ? 'block' : 'none';
        });
      });

      // Auto-select the first tab on load
      if (i === 0) btn.click();
    });
  });
}

// Initialize mental health section
document.addEventListener('DOMContentLoaded', () => {
  initDetailsToggle();
  initDisorderTabs();
});
function initJourneyCollapsible() {
  const buttons = document.querySelectorAll('.collapsible');

  buttons.forEach(button => {
    const content = button.nextElementSibling;

    if (!content || !content.classList.contains('content')) return;

    // Set initial collapsed state
    content.style.maxHeight = null;
    content.style.overflow = 'hidden';
    content.style.transition = 'max-height 0.5s ease, padding 0.3s ease';

    button.addEventListener('click', () => {
      const isOpen = button.classList.toggle('active');

      if (isOpen) {
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.paddingTop = '10px';
        content.style.paddingBottom = '10px';
      } else {
        content.style.maxHeight = null;
        content.style.paddingTop = '0';
        content.style.paddingBottom = '0';
      }
    });

    // Accessibility
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', !expanded);
    });
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initJourneyCollapsible();
});