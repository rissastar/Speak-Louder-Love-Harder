<script>
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

    // Initialize button text and body class based on localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
      toggleBtn.textContent = '☀️ Light Mode';
    } else {
      toggleBtn.textContent = '🌙 Dark Mode';
    }

    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      toggleBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
      localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    });
  }

  // --- Collapsible Buttons ---
  function initCollapsibles() {
    const collapsibles = document.querySelectorAll('.collapsible');

    collapsibles.forEach(button => {
      const content = button.nextElementSibling;
      if (!content || !content.classList.contains('content')) return;

      content.style.maxHeight = null;
      content.style.overflow = 'hidden';
      content.style.transition = 'max-height 0.5s ease, padding 0.3s ease';

      button.setAttribute('aria-expanded', 'false');

      button.addEventListener('click', () => {
        const isOpen = button.classList.toggle('active');
        button.setAttribute('aria-expanded', isOpen);

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
    });
  }

  // --- Only one <details> open at a time ---
  function initDetailsToggle() {
    const detailsList = document.querySelectorAll('#mental-health-conditions .collapsible-content > details');
    detailsList.forEach(detail => {
      detail.addEventListener('toggle', () => {
        if (detail.open) {
          detailsList.forEach(other => {
            if (other !== detail) other.removeAttribute('open');
          });
        }
      });
    });
  }

  // --- Disorder Tabs ---
  function initDisorderTabs() {
    const tabGroups = document.querySelectorAll('#mental-health-conditions .tab-buttons');

    tabGroups.forEach(tabGroup => {
      const buttons = tabGroup.querySelectorAll('button');
      const tabContents = tabGroup.parentElement.querySelectorAll('.tab-content');

      buttons.forEach((btn, i) => {
        btn.addEventListener('click', () => {
          buttons.forEach(b => b.classList.remove('active'));
          tabContents.forEach(c => (c.style.display = 'none'));
          btn.classList.add('active');
          if (tabContents[i]) tabContents[i].style.display = 'block';
        });

        // Activate first tab by default
        if (i === 0) btn.click();
      });
    });
  }

  // --- Mobile Nav Toggle ---
  function toggleNav() {
    const nav = document.getElementById('collapsibleNav');
    if (nav) nav.classList.toggle('active');
  }

  // Attach toggleNav to mobile nav button on DOM load
  document.addEventListener('DOMContentLoaded', () => {
    const navToggleBtn = document.getElementById('mobile-nav-toggle');
    if (navToggleBtn) {
      navToggleBtn.addEventListener('click', toggleNav);
    }
  });

  // --- Initialize on DOM load ---
  document.addEventListener('DOMContentLoaded', () => {
    fadeInOnScroll();
    updateProgressBar();
    initDarkModeToggle();
    initCollapsibles();
    initDetailsToggle();
    initDisorderTabs();
  });

  // --- Scroll event listeners ---
  window.addEventListener('scroll', () => {
    fadeInOnScroll();
    updateProgressBar();
  });
</script>