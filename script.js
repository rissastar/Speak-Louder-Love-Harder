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
    });
  });
});