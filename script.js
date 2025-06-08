document.addEventListener('DOMContentLoaded', () => {
  // Dark/Light mode toggle
  const toggle = document.querySelector('#mode-toggle');
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'light') document.body.classList.add('light');
  toggle.checked = currentTheme === 'light';

  toggle.addEventListener('change', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
  });

  // Quote carousel
  const quotes = [
    "You are stronger than you think.",
    "One step at a time is all it takes.",
    "Keep going, better days are coming.",
    "Your story isn't over yet."
  ];
  let qi = 0;
  const qc = document.querySelector('.quote-carousel');
  const cycleQuotes = () => {
    qc.style.opacity = 0;
    setTimeout(() => {
      qi = (qi + 1) % quotes.length;
      qc.textContent = quotes[qi];
      qc.style.opacity = 1;
    }, 800);
  };
  qc.textContent = quotes[qi];
  setInterval(cycleQuotes, 5000);

  // Collapsible sections
  const coll = document.querySelectorAll('.collapsible');
  coll.forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      const panel = btn.nextElementSibling;
      panel.style.maxHeight = panel.style.maxHeight ? null : panel.scrollHeight + "px";

  /* -------------------------------
     CALM MODE TOGGLE
  -------------------------------- */
  const calmToggle = document.getElementById("calm-toggle");
  const calmPref = localStorage.getItem("calm");

  if (calmPref === "on") {
    document.body.classList.add("calm");
    calmToggle.checked = true;
  }

  calmToggle.addEventListener("change", () => {
    document.body.classList.toggle("calm");
    const calm = document.body.classList.contains("calm") ? "on" : "off";
    localStorage.setItem("calm", calm);
  });
  
    /* -------------------------------
     TYPEWRITER HEADER
  -------------------------------- */
  const typewriterEl = document.getElementById("animated-header");
  const typewriterText = "Speak Louder, Love Harder 💖";
  let i = 0;

  function typeNextChar() {
    if (i < typewriterText.length) {
      typewriterEl.textContent += typewriterText.charAt(i);
      i++;
      setTimeout(typeNextChar, 80);
    }
  }

  if (typewriterEl) typeNextChar();