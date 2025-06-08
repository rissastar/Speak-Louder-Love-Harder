// ========== DARK/LIGHT MODE TOGGLE ==========
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('darkModeToggle');
  const calmToggle = document.getElementById('calmModeToggle');
  const body = document.body;

  // Load saved mode
  if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light');
    toggle.checked = true;
  }

  toggle?.addEventListener('change', () => {
    body.classList.toggle('light');
    localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
  });

  calmToggle?.addEventListener('change', () => {
    body.classList.toggle('calm');
  });

  // ========== COLLAPSIBLE SECTIONS ==========
  const collapsibles = document.querySelectorAll('.collapsible');
  collapsibles.forEach((btn) => {
    btn.addEventListener('click', function () {
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + 'px';
    });
  });

  // ========== QUOTE ROTATOR ==========
  const quotes = [
    "“You are not alone.” 💖",
    "“Breathe. You've got this.” 🌈",
    "“One day at a time.” 🧘‍♀️",
    "“It's okay to rest.” 🌟",
    "“You matter. Always.” 🌸",
    "“Speak louder. Love harder.” 💬"
  ];
  let quoteIndex = 0;
  const quoteBox = document.querySelector('.quote-carousel');

  function rotateQuotes() {
    if (!quoteBox) return;
    quoteBox.textContent = quotes[quoteIndex];
    quoteIndex = (quoteIndex + 1) % quotes.length;
  }

  rotateQuotes();
  setInterval(rotateQuotes, 5000);

  // ========== FLOATING HEARTS ==========
  function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = '💖';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 8000);
  }
  setInterval(() => {
    if (!body.classList.contains('calm')) createHeart();
  }, 600);

  // ========== TYPEWRITER HEADER ==========
  const typewriter = document.querySelector('.typewriter-text');
  if (typewriter) {
    const fullText = typewriter.textContent;
    typewriter.textContent = '';
    let i = 0;

    function type() {
      if (i < fullText.length) {
        typewriter.textContent += fullText.charAt(i);
        i++;
        setTimeout(type, 90);
      }
    }
    setTimeout(type, 500);
  }
});