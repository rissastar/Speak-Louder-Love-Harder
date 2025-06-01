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
/* Hide nav-links by default on small screens */
.nav-links {
  display: flex;
  list-style: none;
  gap: 1.5rem;
}

/* Mobile nav toggle button hidden on desktop */
.nav-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  width: 30px;
  height: 24px;
  z-index: 1000;
}

/* Hamburger icon lines */
.hamburger,
.hamburger::before,
.hamburger::after {
  content: '';
  display: block;
  background-color: #333;
  height: 4px;
  border-radius: 2px;
  position: absolute;
  width: 100%;
  transition: all 0.3s ease;
}

.hamburger {
  top: 50%;
  transform: translateY(-50%);
}

.hamburger::before {
  top: 0;
}

.hamburger::after {
  bottom: 0;
}

/* When nav toggle is open, animate hamburger to "X" */
.nav-toggle.open .hamburger {
  background-color: transparent;
}

.nav-toggle.open .hamburger::before {
  transform: rotate(45deg);
  top: 50%;
}

.nav-toggle.open .hamburger::after {
  transform: rotate(-45deg);
  bottom: 50%;
}

/* Responsive */
@media (max-width: 768px) {
  .nav-toggle {
    display: block;
  }

  .nav-links {
    flex-direction: column;
    display: none;
    background-color: #fff;
    position: absolute;
    top: 60px; /* adjust based on your nav height */
    right: 10px;
    width: 200px;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    border-radius: 6px;
  }

  .nav-links.nav-open {
    display: flex;
  }
}