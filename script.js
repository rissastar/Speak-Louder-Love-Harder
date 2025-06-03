document.addEventListener('DOMContentLoaded', () => {
  // Dark Mode Toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      darkModeToggle.setAttribute('aria-pressed', isDark);
    });
  }

  // Collapsible Sections
  const collapsibles = document.querySelectorAll('.collapsible');
  collapsibles.forEach(button => {
    const content = button.nextElementSibling;
    button.setAttribute('aria-expanded', 'false');
    if (content) {
      content.setAttribute('aria-hidden', 'true');
    }

    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      button.classList.toggle('active');

      if (content) {
        content.setAttribute('aria-hidden', String(expanded));
        if (expanded) {
          content.style.maxHeight = null;
          content.style.padding = '0 1em';
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
          content.style.padding = '1em';
        }
      }
    });
  });

  // Tabbed Content
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-tab');

      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      tabContents.forEach(content => {
        if (content.id === target) {
          content.classList.add('active');
          content.removeAttribute('hidden');
        } else {
          content.classList.remove('active');
          content.setAttribute('hidden', 'true');
        }
      });
    });
  });

  // Scroll Progress Bar
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    });
  }
});