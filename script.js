document.addEventListener('DOMContentLoaded', () => {
  // Scroll Progress Bar
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${scrollPercent}%`;
  });

  // Typewriter effect for hero heading
  const heroHeading = document.querySelector('.hero h1.typewriter');
  if (heroHeading) {
    // We rely on CSS animation for typewriter - no JS needed here.
  }

  // Dark mode toggle
  const darkToggle = document.getElementById('dark-mode-toggle');
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      darkToggle.textContent = '☀️';
      document.body.style.background = '#2a1a4f';
      document.body.style.color = '#e1bee7';
    } else {
      darkToggle.textContent = '🌙';
      document.body.style.background = '#f9f4fb';
      document.body.style.color = '#3a0ca3';
    }
  });

  // Ambient music toggle
  const musicToggle = document.getElementById('music-toggle');
  const ambientAudio = new Audio('https://cdn.pixabay.com/download/audio/2022/05/03/audio_5b41f8e008.mp3?filename=relaxing-music-ambient-10762.mp3');
  ambientAudio.loop = true;
  let musicPlaying = false;

  musicToggle.addEventListener('click', () => {
    if (!musicPlaying) {
      ambientAudio.play();
      musicToggle.textContent = '🔈';
      musicPlaying = true;
    } else {
      ambientAudio.pause();
      musicToggle.textContent = '🔇';
      musicPlaying = false;
    }
  });

  // Popup Quote of the Day
  const quotes = [
    "Speak louder, love harder.",
    "Your voice matters—never doubt it.",
    "Strength grows in the moments when you think you can’t go on but you keep going anyway.",
    "Healing isn’t linear, but it’s always forward.",
    "Hope is the loudest voice in the silence."
  ];

  function showQuotePopup() {
    const quotePopup = document.getElementById('quote-popup');
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quotePopup.textContent = randomQuote;
    quotePopup.classList.add('show');
    setTimeout(() => {
      quotePopup.classList.remove('show');
    }, 7000);
  }

  showQuotePopup();

  // Paw prints on cursor
  let pawTimeouts = [];
  document.addEventListener('mousemove', (e) => {
    const paw = document.createElement('div');
    paw.classList.add('paw-print');
    paw.style.left = `${e.clientX - 12}px`; // center the 24px paw
    paw.style.top = `${e.clientY - 12}px`;
    document.body.appendChild(paw);

    setTimeout(() => {
      paw.remove();
    }, 1000);
  });

  // Add animated SVG backgrounds dynamically for hero & sections
  function addSVGBackgrounds() {
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.insertAdjacentHTML('beforeend', `
        <svg class="background-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#ff6ec4;stop-opacity:0.6" />
              <stop offset="100%" style="stop-color:#7873f5;stop-opacity:0.6" />
            </linearGradient>
          </defs>
          <path fill="url(#grad1)" d="M50 15 Q70 0 90 15 T130 15 Q150 0 170 15 L170 180 L30 180 Z" />
          <circle cx="60" cy="60" r="15" fill="#ff6ec4" opacity="0.4">
            <animate attributeName="r" values="15;20;15" dur="6s" repeatCount="indefinite"/>
          </circle>
          <circle cx="140" cy="80" r="20" fill="#7873f5" opacity="0.3">
            <animate attributeName="r" values="20;25;20" dur="8s" repeatCount="indefinite"/>
          </circle>
        </svg>
      `);
    }

    // For other sections, add subtle ribbons or hearts
    document.querySelectorAll('.section').forEach((section, idx) => {
      const colors = ['#ff80ab', '#b39ddb', '#80cbc4', '#ff8a80', '#9575cd'];
      const color = colors[idx % colors.length];
      section.insertAdjacentHTML('beforeend', `
        <svg class="background-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" preserveAspectRatio="xMidYMid meet" style="opacity:0.12;position:absolute;top:-20px;right:-20px;z-index:0;">
          <path fill="${color}" d="M30 20c10-20 60 10 40 40s-60-10-40-40z" transform="rotate(45 60 60)">
            <animateTransform attributeName="transform" type="rotate" values="0 60 60; 360 60 60" dur="20s" repeatCount="indefinite"/>
          </path>
          <circle cx="80" cy="30" r="10" fill="${color}" opacity="0.3">
            <animate attributeName="r" values="10;15;10" dur="5s" repeatCount="indefinite"/>
          </circle>
        </svg>
      `);
    });
  }

  addSVGBackgrounds();

});