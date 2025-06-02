// Wait until DOM is loaded
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

  // Scroll progress bar update
  function updateProgressBar() {
    const scrollTop = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrolled + "%";
  }

  window.addEventListener("scroll", updateProgressBar);
  updateProgressBar(); // initial call on load

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

  // Optional: Focus styles for accessibility on magic links
  const magicLinks = document.querySelectorAll(".magic-link");
  magicLinks.forEach(link => {
    link.addEventListener("focus", () => link.classList.add("hovered"));
    link.addEventListener("blur", () => link.classList.remove("hovered"));
  });
  
  document.querySelectorAll('.tab-buttons').forEach(tabGroup => {
    const buttons = tabGroup.querySelectorAll('button');
    const tabContents = tabGroup.parentElement.querySelectorAll('.tab-content');
    
    // Hide all except first tab content initially
    tabContents.forEach((content, i) => content.style.display = i === 0 ? 'block' : 'none');
    
    buttons.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        tabContents.forEach(c => (c.style.display = 'none'));
        tabContents[idx].style.display = 'block';
      });
});
<script>
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
</script>