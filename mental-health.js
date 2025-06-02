document.addEventListener("DOMContentLoaded", () => {
  // Collapsible tabbed sections
  const allTabButtons = document.querySelectorAll(".tab-buttons");
  
  allTabButtons.forEach(buttonGroup => {
    const buttons = buttonGroup.querySelectorAll(".tab-btn");

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const parent = button.closest("details");
        const tabId = button.getAttribute("data-tab");
        const tabContents = parent.querySelectorAll(".tab-content");
        
        // Remove active class from all buttons and contents
        buttons.forEach(btn => btn.classList.remove("active"));
        tabContents.forEach(content => content.classList.remove("active"));
        
        // Add active class to clicked button and corresponding content
        button.classList.add("active");
        const activeContent = parent.querySelector(`#${tabId}`);
        if (activeContent) {
          activeContent.classList.add("active");
        }
      });
    });
  });

  // Optional: Smooth scroll to section from nav (if anchor links used)
  const magicLinks = document.querySelectorAll(".magic-link");

  magicLinks.forEach(link => {
    link.addEventListener("click", event => {
      const href = link.getAttribute("href");
      if (href.startsWith("#")) {
        event.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
});