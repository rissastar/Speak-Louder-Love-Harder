(function() {
  // your mental-health.js code here
})();
// === 1. Tab Toggle Logic ===
document.querySelectorAll('details').forEach(section => {
  const tabBtns = section.querySelectorAll('.tab-btn');
  const tabContents = section.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabContents.forEach(c => {
        c.classList.remove('active');
        if (c.id === tabId) c.classList.add('active');
      });
    });
  });
});

// === 2. Dark Mode Toggle ===
const darkToggle = document.getElementById('dark-mode-toggle');
const prefersDark = localStorage.getItem('theme') === 'dark';

if (prefersDark) {
  document.body.classList.add('dark-mode');
}

darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});

// === 3. Scroll Progress Bar ===
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById('progress-bar').style.width = `${scrollPercent}%`;
});

// === 4. Aria-expanded toggling for accessibility ===
document.querySelectorAll('details').forEach(detail => {
  const summary = detail.querySelector('summary');
  if (!summary) return;

  summary.addEventListener('click', () => {
    setTimeout(() => {
      summary.setAttribute('aria-expanded', detail.open);
    }, 1);
  });
});

// === 5. Scroll-triggered Fade-In ===
const fadeEls = document.querySelectorAll('.fade-in-on-scroll');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.2
});

fadeEls.forEach(el => observer.observe(el));

// === 6. Journaling Checkbox Progress Tracker ===
document.querySelectorAll('input[data-journal-id]').forEach(box => {
  const key = `journal-${box.dataset.journalId}`;
  box.checked = localStorage.getItem(key) === 'true';

  box.addEventListener('change', () => {
    localStorage.setItem(key, box.checked);
  });
});