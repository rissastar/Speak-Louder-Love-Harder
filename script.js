// Wait for DOM content
document.addEventListener('DOMContentLoaded', () => {
  /* ==== CUSTOM CURSOR === */
  const cursor = document.getElementById('custom-cursor');
  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let cursorX = mouseX, cursorY = mouseY;
  const ease = 0.15;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * ease;
    cursorY += (mouseY - cursorY) * ease;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  /* ==== MAGNETIC HOVER EFFECT === */
  const magneticEls = document.querySelectorAll('.magnetic-hover');
  magneticEls.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;

      const deltaX = (relX - midX) / midX;
      const deltaY = (relY - midY) / midY;

      // Pull cursor toward element center
      cursor.style.transform = `translate(${mouseX + deltaX * 15}px, ${mouseY + deltaY * 15}px) translate(-50%, -50%)`;

      // Move element slightly to mouse
      el.style.transform = `translate(${deltaX * 10}px, ${deltaY * 10}px) scale(1.05)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  /* ==== SCROLL TO TOP BUTTON === */
  const scrollBtn = document.getElementById('scrollToTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight / 2) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ==== NAV PILL HIGHLIGHT === */
  const navList = document.querySelector('.nav-list');
  const navLinks = navList.querySelectorAll('a');
  const navPill = document.createElement('div');
  navPill.className = 'nav-pill-highlight';
  navList.appendChild(navPill);

  function updateNavPill(el) {
    if (!el) {
      navPill.style.opacity = '0';
      return;
    }
    const rect = el.getBoundingClientRect();
    const parentRect = navList.getBoundingClientRect();

    navPill.style.width = rect.width + 'px';
    navPill.style.left = (rect.left - parentRect.left) + 'px';
    navPill.style.opacity = '1';
  }

  // Initially highlight first nav link or current page link
  let activeLink = navLinks[0];
  updateNavPill(activeLink);

  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => updateNavPill(link));
    link.addEventListener('focus', () => updateNavPill(link));
  });
  navList.addEventListener('mouseleave', () => updateNavPill(activeLink));

  /* ==== TYPING EFFECT FOR HEADER TITLE === */
  const fullText = "Speak Louder, Love Harder 🌟";
  const titleEl = document.getElementById('animated-title');
  let currentIndex = 0;

  function typeNext() {
    if (currentIndex <= fullText.length) {
      titleEl.textContent = fullText.slice(0, currentIndex) + (currentIndex < fullText.length ? '|' : '');
      currentIndex++;
      setTimeout(typeNext, 120);
    } else {
      // Remove blinking cursor after typing done
      titleEl.textContent = fullText;
    }
  }
  typeNext();

  /* ==== QUOTE ROTATOR === */
  const quotes = [
    "Healing begins when we choose to speak up.",
    "Love is the strongest force of all.",
    "Your story matters, and your voice counts.",
    "Together, we rise stronger and kinder.",
    "Speak louder, love harder — every day."
  ];
  const quoteEl = document.getElementById('quote-rotator');
  let quoteIndex = 0;

  function rotateQuote() {
    // fade out
    quoteEl.classList.add('fade-out');
    setTimeout(() => {
      quoteIndex = (quoteIndex + 1) % quotes.length;
      quoteEl.textContent = quotes[quoteIndex];
      // fade in
      quoteEl.classList.remove('fade-out');
      quoteEl.classList.add('fade-in');
    }, 600);
    setTimeout(() => {
      quoteEl.classList.remove('fade-in');
    }, 1200);
  }
  setInterval(rotateQuote, 7000);

  /* ==== DAILY AFFIRMATION GENERATOR === */
  const affirmations = [
    "I am worthy of love and kindness.",
    "Every day, I grow stronger and more resilient.",
    "I choose to heal and move forward.",
    "My voice makes a difference in the world.",
    "Compassion and courage guide me."
  ];
  const affirmationBox = document.getElementById('affirmation-box');
  const newAffirmBtn = document.getElementById('new-affirmation');

  function showAffirmation() {
    affirmationBox.style.opacity = 0;
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * affirmations.length);
      affirmationBox.textContent = affirmations[randomIndex];
      affirmationBox.style.opacity = 1;
    }, 400);
  }
  newAffirmBtn.addEventListener('click', showAffirmation);

  // Show first affirmation initially
  showAffirmation();

  /* ==== SCROLL-TRIGGERED ANIMATIONS === */
  const scrollAnimElements = document.querySelectorAll('[data-scroll-animate]');
  function checkScroll() {
    const triggerBottom = window.innerHeight * 0.85;
    scrollAnimElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < triggerBottom) {
        el.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', checkScroll);
  checkScroll(); // run once on load

  /* ==== CONFETTI BURST ON AFFIRMATION BUTTON CLICK ==== */
  // Minimal confetti effect
  const confettiCanvas = document.getElementById('confetti-canvas');
  const ctx = confettiCanvas.getContext('2d');
  let confettiParticles = [];

  function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function createConfetti() {
    for (let i = 0; i < 30; i++) {
      confettiParticles.push({
        x: Math.random() * confettiCanvas.width,
        y: Math.random() * confettiCanvas.height + confettiCanvas.height / 2,
        size: Math.random() * 6 + 4,
        speedX: (Math.random() - 0.5) * 4,
        speedY: Math.random() * -6 - 4,
        color: `hsl(${Math.random() * 360}, 80%, 70%)`,
        angle: Math.random() * 360,
        angularSpeed: (Math.random() - 0.5) * 0.2,
        opacity: 1
      });
    }
  }

  function updateConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiParticles.forEach((p, i) => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.speedY += 0.15; // gravity
      p.angle += p.angularSpeed;
      p.opacity -= 0.02;

      if (p.opacity <= 0) {
        confettiParticles.splice(i, 1);
      } else {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle * Math.PI / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    });
    if (confettiParticles.length > 0) {
      requestAnimationFrame(updateConfetti);
    }
  }

  newAffirmBtn.addEventListener('click', () => {
    createConfetti();
    if (confettiParticles.length === 30) {
      updateConfetti();
    }
  });
});