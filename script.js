// script.js

document.addEventListener("DOMContentLoaded", () => {
  const tabGroups = document.querySelectorAll("details");

  tabGroups.forEach(group => {
    const tabs = group.querySelectorAll(".tab-btn");
    const contents = group.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(btn => btn.classList.remove("active"));
        contents.forEach(content => content.classList.remove("active"));

        tab.classList.add("active");
        const activeContent = group.querySelector(`#${tab.dataset.tab}`);
        if (activeContent) {
          activeContent.classList.add("active");
        }
      });
    });
  });

  // Dark Mode Toggle
  const darkToggle = document.getElementById("dark-mode-toggle");
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
});