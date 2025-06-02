<script>
  document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const progressBar = document.getElementById("progress-bar");
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const collapsibleNav = document.getElementById("collapsibleNav");

    // --- Dark Mode: Load saved preference or system default ---
    const savedTheme = localStorage.getItem("dark-mode");
    if (savedTheme === "enabled") {
      body.classList.add("dark-mode");
      if (darkModeToggle) darkModeToggle.textContent = "☀️";
    } else if (savedTheme === "disabled") {
      body.classList.remove("dark-mode");
      if (darkModeToggle) darkModeToggle.textContent = "🌙";
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        body.classList.add("dark-mode");
        localStorage.setItem("dark-mode", "enabled");
        if (darkModeToggle) darkModeToggle.textContent = "☀️";
      } else {
        localStorage.setItem("dark-mode", "disabled");
        if (darkModeToggle) darkModeToggle.textContent = "🌙";
      }
    }

    // --- Dark Mode: Toggle ---
    if (darkModeToggle) {
      darkModeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        if (body.classList.contains("dark-mode")) {
          localStorage.setItem("dark-mode", "enabled");
          darkModeToggle.textContent = "☀️";
        } else {
          localStorage.setItem("dark-mode", "disabled");
          darkModeToggle.textContent = "🌙";
        }
      });
    }

    // --- Scroll Progress Bar ---
    function updateProgressBar() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      if (progressBar) progressBar.style.width = scrollPercent + "%";
    }
    window.addEventListener("scroll", updateProgressBar);
    updateProgressBar();

    // --- Magic Link Focus Effects ---
    document.querySelectorAll(".magic-link").forEach(link => {
      link.addEventListener("focus", () => link.classList.add("hovered"));
      link.addEventListener("blur", () => link.classList.remove("hovered"));
    });

    // --- Tab Button Functionality ---
    document.querySelectorAll('.tab-buttons').forEach(tabGroup => {
      const buttons = tabGroup.querySelectorAll('button');
      const tabContents = tabGroup.parentElement.querySelectorAll('.tab-content');

      // Show first tab by default
      tabContents.forEach((content, i) => content.style.display = i === 0 ? 'block' : 'none');

      buttons.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
          tabContents.forEach(c => c.style.display = 'none');
          tabContents[idx].style.display = 'block';

          // Optional: Add active class
          buttons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
      });
    });

    // --- Mental Health Section Tabs (if present) ---
    document.querySelectorAll('#mental-health-conditions details').forEach(details => {
      const buttons = details.querySelectorAll('.tab-buttons button');
      const contents = details.querySelectorAll('.tab-content');

      contents.forEach((content, i) => content.style.display = i === 0 ? 'block' : 'none');

      buttons.forEach((btn, i) => {
        btn.addEventListener('click', () => {
          contents.forEach(c => c.style.display = 'none');
          contents[i].style.display = 'block';
          buttons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
      });
    });

    // --- Collapsible Nav ---
    window.toggleNav = function () {
      if (collapsibleNav.classList.contains("nav-open")) {
        collapsibleNav.classList.remove("nav-open");
      } else {
        collapsibleNav.classList.add("nav-open");
      }
    };
  });
</script>