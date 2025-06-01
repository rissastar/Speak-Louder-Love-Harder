document.addEventListener('DOMContentLoaded', () => {
  // Accordion toggle
  const accordions = document.querySelectorAll('.accordion-header');

  accordions.forEach(acc => {
    acc.addEventListener('click', () => {
      const expanded = acc.getAttribute('aria-expanded') === 'true';
      const panel = document.getElementById(acc.getAttribute('aria-controls'));

      // Close all accordions
      accordions.forEach(a => {
        a.setAttribute('aria-expanded', 'false');
        const p = document.getElementById(a.getAttribute('aria-controls'));
        p.style.maxHeight = null;
      });

      // Toggle current accordion
      if (!expanded) {
        acc.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('nav-open');
  });
});