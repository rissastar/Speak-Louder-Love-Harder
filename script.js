// script.js

document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.getElementById('progress-bar');
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;

  // Scroll Progress Bar
  function updateProgressBar() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  }

  window.addEventListener('scroll', updateProgressBar);
  updateProgressBar();

  // Dark Mode Toggle with Persistence
  if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
  } else {
    darkModeToggle.textContent = '🌙';
  }

  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
      darkModeToggle.textContent = '☀️';
    } else {
      localStorage.setItem('darkMode', 'disabled');
      darkModeToggle.textContent = '🌙';
    }
  });

  darkModeToggle.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      darkModeToggle.click();
    }
  });

  // Smooth Scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElem = document.getElementById(targetId);
      if (targetElem) {
        targetElem.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- TYPEWRITER EFFECT ---
  // Animate typing effect for the h1.typewriter element
  const typewriterElem = document.querySelector('h1.typewriter');
  if (typewriterElem) {
    const text = typewriterElem.textContent;
    typewriterElem.textContent = '';
    let index = 0;
    const typingSpeed = 100; // milliseconds per character

    function type() {
      if (index < text.length) {
        typewriterElem.textContent += text.charAt(index);
        index++;
        setTimeout(type, typingSpeed);
      }
    }
    type();
  }

  // --- INTERACTIVE TOPIC CARDS ---
  // Add hover effect via JS to .magic-link elements (if needed)
  const topicLinks = document.querySelectorAll('.magic-link');

  topicLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.classList.add('hovered');
    });
    link.addEventListener('mouseleave', () => {
      link.classList.remove('hovered');
    });
  });
});