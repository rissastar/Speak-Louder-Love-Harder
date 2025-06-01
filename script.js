document.addEventListener('DOMContentLoaded', () => {
  // ===== Active Nav Link Highlight =====
  const navLinks = document.querySelectorAll('nav .nav-links a');
  const currentPage = window.location.pathname.split('/').pop();

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (linkPage === 'index.html' && currentPage === '')) {
      link.classList.add('active');
    }
  });

  // ===== Smooth Scroll for Internal Anchors =====
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetID = link.getAttribute('href').slice(1);
      const targetElement = document.getElementById(targetID);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ===== Accordion Toggle for FAQs or Collapsible Sections =====
  const accordions = document.querySelectorAll('.accordion-header');
  accordions.forEach(header => {
    header.addEventListener('click', () => {
      // Toggle active state
      header.classList.toggle('active');

      // Toggle panel visibility
      const panel = header.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  // ===== Mobile Nav Toggle (optional) =====
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-links');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('nav-open');
      navToggle.classList.toggle('open');
    });
  }
});