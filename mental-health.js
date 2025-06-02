document.addEventListener("DOMContentLoaded", () => {
  // === 1. Accordion Animation ===
  const allDetails = document.querySelectorAll("details");

  allDetails.forEach(detail => {
    const summary = detail.querySelector("summary");
    if (summary) {
      summary.addEventListener("click", (e) => {
        const isOpen = detail.hasAttribute("open");
        allDetails.forEach(d => {
          if (d !== detail) d.removeAttribute("open");
        });

        // Animation
        setTimeout(() => {
          if (!isOpen) detail.setAttribute("open", "");
          else detail.removeAttribute("open");
        }, 10);
      });
    }
  });

  // === 2. Tab Remembering ===
  const allTabGroups = document.querySelectorAll(".tab-buttons");

  allTabGroups.forEach((group, index) => {
    const buttons = group.querySelectorAll(".tab-btn");

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const tabId = button.getAttribute("data-tab");
        const parent = button.closest("details");
        const tabContents = parent.querySelectorAll(".tab-content");

        buttons.forEach(btn => btn.classList.remove("active"));
        tabContents.forEach(content => content.classList.remove("active"));

        button.classList.add("active");
        parent.querySelector(`#${tabId}`).classList.add("active");

        // Save to localStorage
        localStorage.setItem(`mh_tab_${index}`, tabId);
      });

      // Load saved tab on refresh
      const savedTab = localStorage.getItem(`mh_tab_${index}`);
      if (savedTab && button.getAttribute("data-tab") === savedTab) {
        button.click();
      }
    });
  });

  // === 3. Dark/Light Mode Toggle ===
  const toggle = document.getElementById("dark-mode-toggle");
  const root = document.documentElement;

  if (toggle) {
    // Load saved mode
    const savedTheme = localStorage.getItem("mh_theme");
    if (savedTheme === "dark") {
      root.classList.add("dark");
      toggle.checked = true;
    }

    toggle.addEventListener("change", () => {
      if (toggle.checked) {
        root.classList.add("dark");
        localStorage.setItem("mh_theme", "dark");
      } else {
        root.classList.remove("dark");
        localStorage.setItem("mh_theme", "light");
      }
    });
  }

  // === 4. Scroll Progress Bar ===
  const progressBar = document.getElementById("scroll-progress");

  if (progressBar) {
    window.addEventListener("scroll", () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = `${scrolled}%`;
    });
  }
});