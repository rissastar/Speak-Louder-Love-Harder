document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.getElementById("progress-bar");
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const body = document.body;

  // Initialize dark mode based on saved preference or system preference
  const savedTheme = localStorage.getItem("dark-mode");
  if (savedTheme === "enabled") {
    body.classList.add("dark-mode");
    darkModeToggle.textContent = "☀️"; // sun icon for light mode toggle
  } else if (savedTheme === "disabled") {
    body.classList.remove("dark-mode");
    darkModeToggle.textContent = "🌙"; // moon icon for dark mode toggle
  } else {
    // If no preference saved, check system preference
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      body.classList.add("dark-mode");
      darkModeToggle.textContent = "☀️";
      localStorage.setItem("dark-mode", "enabled");
    } else {
      darkModeToggle.textContent = "🌙";
      localStorage.setItem("dark-mode", "disabled");
    }
  }

  // Scroll progress bar update function
  function updateProgressBar() {
    const scrollTop = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrolled + "%";
  }

  // Initial call and event listener for scroll
  window.addEventListener("scroll", updateProgressBar);
  updateProgressBar();

  // Dark mode toggle button click handler
  darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("dark-mode", "enabled");
      darkModeToggle.textContent = "☀️"; // sun icon
    } else {
      localStorage.setItem("dark-mode", "disabled");
      darkModeToggle.textContent = "🌙"; // moon icon
    }
  });

  // Accessibility: Focus styles on magic links
  const magicLinks = document.querySelectorAll(".magic-link");
  magicLinks.forEach(link => {
    link.addEventListener("focus", () => link.classList.add("hovered"));
    link.addEventListener("blur", () => link.classList.remove("hovered"));
  });

  // Tabs functionality
  document.querySelectorAll('.tab-buttons').forEach(tabGroup => {
    const buttons = tabGroup.querySelectorAll('button');
    const tabContents = tabGroup.parentElement.querySelectorAll('.tab-content');

    // Hide all except the first tab content initially
    tabContents.forEach((content, i) => content.style.display = i === 0 ? 'block' : 'none');

    buttons.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        tabContents.forEach(c => (c.style.display = 'none'));
        tabContents[idx].style.display = 'block';
      });
      
      // Wait for DOM content to load
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('dark-mode-toggle');
  const body = document.body;
  const progressBar = document.getElementById('progress-bar');

  // Load saved theme from localStorage (if any)
  if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
  }

  // Toggle dark mode when button clicked
  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Save preference
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
    } else {
      localStorage.setItem('darkMode', 'disabled');
    }
  });

  // Scroll progress bar animation
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    progressBar.style.width = scrollPercent + '%';
  });
  
  // Toggle collapsible navbar
function toggleNav() {
  const nav = document.getElementById('collapsibleNav');
  if (nav.style.display === 'block') {
    nav.style.display = 'none';
  } else {
    nav.style.display = 'block';
  }
}

// Tab switching for all mental health disorders
document.querySelectorAll('#mental-health-conditions details').forEach(details => {
  const buttons = details.querySelectorAll('.tab-buttons button');
  const contents = details.querySelectorAll('.tab-content');

  // Hide all tab contents except first by default
  contents.forEach((content, i) => {
    content.style.display = i === 0 ? 'block' : 'none';
  });

  buttons.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      // Hide all
      contents.forEach(c => (c.style.display = 'none'));
      // Show selected
      contents[i].style.display = 'block';

      // Optional: style active button
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
    function toggleNav() {
  const nav = document.getElementById('collapsibleNav');
  if (nav.style.display === 'block') {
    nav.style.display = 'none';
  } else {
    nav.style.display = 'block';
  }
}
  });
});
});
    });
  });
});