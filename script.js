function toggleDarkMode() {
  document.body.classList.toggle("light-mode");
  localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
}

// Load saved theme on page load
window.onload = function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  }

  // Create and insert nav toggle for mobile
  const nav = document.querySelector("nav");
  const toggle = document.createElement("button");
  toggle.textContent = "☰ Menu";
  toggle.className = "nav-toggle";
  toggle.onclick = () => nav.classList.toggle("show");
  nav.parentNode.insertBefore(toggle, nav);
};