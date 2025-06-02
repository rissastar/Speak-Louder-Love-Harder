<script>
  document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const progressBar = document.getElementById("progress-bar");
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const collapsibleNav = document.getElementById("collapsibleNav");

    // -----------------------
    // DARK MODE
    // -----------------------
    function applyDarkMode(enabled) {
      if (enabled) {
        body.classList.add("dark-mode");
        localStorage.setItem("dark-mode", "enabled");
        if (darkModeToggle) darkModeToggle.textContent = "☀️";
      } else {
        body.classList.remove("dark-mode");
        localStorage.setItem("dark-mode", "disabled");
        if (darkModeToggle) darkModeToggle.textContent = "🌙";
      }
    }

    // Load saved or system preference
    const savedTheme = localStorage.getItem("dark-mode");
    if (savedTheme === "enabled") {
      applyDarkMode(true);
    } else if (savedTheme === "disabled") {
      applyDarkMode(false);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyDarkMode(prefersDark);
    }

    // Toggle handler
    if (darkModeToggle) {
      darkModeToggle.addEventListener("click", () => {
        const isDark = body.classList.toggle("dark-mode");
        applyDarkMode(isDark);
      });
    }

    // -----------------------
    // SCROLL PROGRESS BAR
    // -----------------------
    function updateProgressBar() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      if (progressBar) progressBar.style.width = scrollPercent + "%";
    }

    window.addEventListener("scroll", updateProgressBar);
    updateProgressBar();

    // -----------------------
    // MAGIC LINK FOCUS EFFECT
    // -----------------------
    document.querySelectorAll(".magic-link").forEach(link => {
      link.addEventListener("focus", () => link.classList.add("hovered"));
      link.addEventListener("blur", () => link.classList.remove("hovered"));
    });

    // -----------------------
    // TABBED CONTENT
    // -----------------------
    function setupTabs(containerSelector) {
      document.querySelectorAll(containerSelector).forEach(container => {
        const buttons = container.querySelectorAll(".tab-buttons button");
        const contents = container.querySelectorAll(".tab-content");

        // Show first tab by default
        contents.forEach((content, i) => {
          content.style.display = i === 0 ? "block" : "none";
        });

        // Button click logic
        buttons.forEach((btn, idx) => {
          btn.addEventListener("click", () => {
            contents.forEach(c => (c.style.display = "none"));
            contents[idx].style.display = "block";

            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
          });
        });
      });
    }

    setupTabs(".tab-buttons"); // general tab sections
    setupTabs("#mental-health-conditions details"); // mental health section

    // -----------------------
    // COLLAPSIBLE NAV
    // -----------------------
    window.toggleNav = function () {
      if (collapsibleNav) {
        collapsibleNav.classList.toggle("nav-open");
      }
    };
  });
  
  document.querySelectorAll('details').forEach((detail) => {
    const buttons = detail.querySelectorAll('.tab-buttons button');
    const tabs = detail.querySelectorAll('.tab-content');

    if (buttons.length && tabs.length) {
      // Set the first tab as active
      tabs.forEach((tab, i) => {
        tab.style.display = i === 0 ? 'block' : 'none';
      });

      buttons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
          tabs.forEach(tab => tab.style.display = 'none');
          tabs[index].style.display = 'block';
        });
      });
    }
  });
  
document.querySelectorAll("details").forEach((detail) => {
  const summary = detail.querySelector("summary");
  summary.setAttribute("aria-expanded", detail.open);

  summary.addEventListener("click", () => {
    // Delay to wait for open state to update
    setTimeout(() => {
      summary.setAttribute("aria-expanded", detail.open);
    }, 10);
  });
});

document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const tabId = btn.getAttribute("data-tab");

    // Hide all tab contents
    document.querySelectorAll(".tab-content").forEach((tab) => {
      tab.style.display = "none";
    });

    // Show the selected tab
    document.getElementById(tabId).style.display = "block";

    // Optional: update button active state
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});
</script>