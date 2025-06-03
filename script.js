document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Button (dynamically created)
  const body = document.body;
  const toggleButton = document.createElement("button");

  toggleButton.textContent = "🎨 Toggle Theme";
  toggleButton.className = "magic-link";
  toggleButton.style.position = "fixed";
  toggleButton.style.top = "1rem";
  toggleButton.style.right = "1rem";

  document.body.appendChild(toggleButton);

  toggleButton.addEventListener("click", () => {
    body.classList.toggle("funky-theme");
  });

  // Tabs functionality for mental health disorder details
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('details');
      if (!parent) return;

      // Remove active class from all buttons in this details
      const siblingsBtns = parent.querySelectorAll('.tab-btn');
      siblingsBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Hide all tab contents in this details
      const tabContents = parent.querySelectorAll('.tab-content');
      tabContents.forEach(tc => tc.classList.remove('active'));

      // Show the selected tab content
      const tabId = btn.dataset.tab;
      const selectedContent = parent.querySelector(`#${tabId}`);
      if (selectedContent) selectedContent.classList.add('active');
    });
  });

  // Dark mode toggle button (existing button with ID 'dark-mode-toggle')
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      // Save preference to localStorage
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
      } else {
        localStorage.setItem('darkMode', 'disabled');
      }
    });

    // On load, apply saved mode
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
    }
  }

  // Scroll progress bar
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / docHeight) * 100;
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }
  });
});