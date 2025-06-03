<script>
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const progressBar = document.getElementById("progress-bar");
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const collapsibleNav = document.getElementById("collapsibleNav");
  const moodSelect = document.getElementById("mood");
  const reflectionTextarea = document.getElementById("reflection");
  const clearButton = document.getElementById("clearTracker");

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

  const savedTheme = localStorage.getItem("dark-mode");
  if (savedTheme === "enabled") {
    applyDarkMode(true);
  } else if (savedTheme === "disabled") {
    applyDarkMode(false);
  } else {
    applyDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      applyDarkMode(!body.classList.contains("dark-mode"));
    });
  }

  // -----------------------
  // SCROLL PROGRESS BAR
  // -----------------------
  function updateProgressBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    if (progressBar) progressBar.style.width = `${scrollPercent}%`;
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
      const buttons = container.querySelectorAll(".tab-buttons button, .tab-btn");
      const contents = container.querySelectorAll(".tab-content");

      contents.forEach((content, i) => {
        content.style.display = i === 0 ? "block" : "none";
      });

      buttons.forEach((btn, idx) => {
        btn.classList.toggle("active", idx === 0);
        btn.addEventListener("click", () => {
          contents.forEach(c => c.style.display = "none");
          contents[idx].style.display = "block";
          buttons.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
        });
      });
    });
  }

  setupTabs(".tab-buttons");
  setupTabs("#mental-health-conditions details");

  document.querySelectorAll("details").forEach(detailsElem => {
    const tabButtons = detailsElem.querySelectorAll('.tab-btn');
    const tabContents = detailsElem.querySelectorAll('.tab-content');

    tabContents.forEach((tab, i) => {
      tab.style.display = i === 0 ? 'block' : 'none';
    });
    tabButtons.forEach((btn, i) => btn.classList.toggle('active', i === 0));

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-tab');

        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => {
          content.style.display = content.id === targetId ? 'block' : 'none';
        });

        button.classList.add('active');
      });
    });
  });

  // -----------------------
  // COLLAPSIBLE NAV
  // -----------------------
  window.toggleNav = function () {
    if (collapsibleNav) {
      collapsibleNav.classList.toggle("nav-open");
    }
  };

  // -----------------------
  // ARIA EXPANDED TOGGLE FOR DETAILS
  // -----------------------
  document.querySelectorAll("details").forEach((detail) => {
    const summary = detail.querySelector("summary");
    if (summary) {
      summary.setAttribute("aria-expanded", detail.open);
      summary.addEventListener("click", () => {
        setTimeout(() => {
          summary.setAttribute("aria-expanded", detail.open);
        }, 10);
      });
    }
  });

  // -----------------------
  // MOOD TRACKER CLEAR BUTTON
  // -----------------------
  if (clearButton && moodSelect && reflectionTextarea) {
    clearButton.addEventListener("click", () => {
      moodSelect.value = "";
      reflectionTextarea.value = "";
    });
  }

  // -----------------------
  // COLLAPSIBLE SECTIONS
  // -----------------------
  document.querySelectorAll(".collapsible").forEach(button => {
    button.addEventListener("click", function () {
      this.classList.toggle("active");
      const content = this.nextElementSibling;
      if (content) {
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
          content.style.paddingTop = "0";
          content.style.paddingBottom = "0";
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
          content.style.paddingTop = "15px";
          content.style.paddingBottom = "15px";
        }
      }
    });
  });
});
</script>