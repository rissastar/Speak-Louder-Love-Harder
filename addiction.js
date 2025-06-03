// addiction.js

document.addEventListener('DOMContentLoaded', function () {
  // Dark mode toggle
  const toggle = document.getElementById('dark-mode-toggle');
  toggle?.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
  });

  // Collapsible sections
  const collapsibles = document.querySelectorAll('.collapsible');
  collapsibles.forEach(button => {
    button.addEventListener('click', function () {
      const content = this.nextElementSibling;
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!isExpanded));
      content.style.display = isExpanded ? 'none' : 'block';
    });
  });

  // Scroll progress bar
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', function () {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
});