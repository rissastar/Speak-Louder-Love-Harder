document.addEventListener("DOMContentLoaded", () => {
  // === 1. Theme Toggle ===
  const themeToggle = document.querySelector(".theme-toggle");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }

  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
  });

  // === 2. Scroll Progress Bar ===
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) progressBar.style.width = `${scrollPercent}%`;
  });

  // === 3. Tab Toggle System ===
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

  // === 4. Aria-expanded Accessibility ===
  document.querySelectorAll('details summary').forEach(summary => {
    summary.addEventListener('click', () => {
      const parent = summary.parentElement;
      setTimeout(() => summary.setAttribute('aria-expanded', parent.open), 1);
    });
  });

  // === 5. Scroll-triggered Fade-In ===
  const fadeEls = document.querySelectorAll('.fade-in-on-scroll');
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  fadeEls.forEach(el => fadeObserver.observe(el));

  // === 6. Journaling Checkbox Tracker ===
  document.querySelectorAll('input[data-journal-id]').forEach(box => {
    const key = `journal-${box.dataset.journalId}`;
    box.checked = localStorage.getItem(key) === 'true';
    box.addEventListener('change', () => localStorage.setItem(key, box.checked));
  });

  // === 7. Journaling Text Save ===
  document.querySelectorAll('textarea[data-journal-id]').forEach(area => {
    const key = `journal-text-${area.dataset.journalId}`;
    area.value = localStorage.getItem(key) || '';
    area.addEventListener('input', () => localStorage.setItem(key, area.value));
  });

  // === 8. Mood Chart + Daily Check-In ===
  const ctx = document.getElementById('moodChart');
  if (ctx && window.Chart) {
    const moodData = JSON.parse(localStorage.getItem('mood-tracker') || '[]');
    const labels = moodData.map(entry => entry.date);
    const moods = moodData.map(entry => entry.moodScore);
    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Mood Level (1-5)',
          data: moods,
          backgroundColor: 'rgba(124, 58, 237, 0.2)',
          borderColor: '#7c3aed',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        scales: {
          y: {
            min: 1,
            max: 5,
            ticks: {
              stepSize: 1,
              callback: v => ['','😢','😰','😐','😊','😄'][v]
            }
          }
        }
      }
    });

    document.getElementById('moodForm')?.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const mood = formData.get('mood');
      const note = formData.get('note');
      const score = { '😢': 1, '😰': 2, '😐': 3, '😊': 4, '😄': 5 }[mood] || 3;
      const today = new Date().toISOString().split('T')[0];

      const newEntry = { date: today, mood, note, moodScore: score };
      const updated = moodData.filter(entry => entry.date !== today);
      updated.push(newEntry);
      localStorage.setItem('mood-tracker', JSON.stringify(updated));
      location.reload();
    });

    document.getElementById('clearMoodData')?.addEventListener('click', () => {
      localStorage.removeItem('mood-tracker');
      location.reload();
    });
  }

  // === 9. Guestbook ===
  const guestbookForm = document.getElementById("guestbook-form");
  const guestbookList = document.getElementById("guestbook-list");
  let guestbookMessages = JSON.parse(localStorage.getItem("guestbookMessages")) || [];

  if (guestbookForm && guestbookList) {
    const renderMessages = () => {
      guestbookList.innerHTML = "";
      if (guestbookMessages.length === 0) {
        guestbookList.innerHTML = "<p>No messages yet. Be the first to connect!</p>";
        return;
      }
      guestbookMessages.slice().reverse().forEach(msg => {
        const msgElem = document.createElement("div");
        msgElem.className = "guestbook-message";
        msgElem.innerHTML = `
          <p class="guestbook-name">${escapeHTML(msg.name)}</p>
          <p class="guestbook-text">${escapeHTML(msg.message)}</p>
          <p class="guestbook-time">${new Date(msg.timestamp).toLocaleString()}</p>
        `;
        guestbookList.appendChild(msgElem);
      });
    };

    const escapeHTML = str => str.replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[m]);

    guestbookForm.addEventListener("submit", e => {
      e.preventDefault();
      const nameInput = guestbookForm.querySelector('input[name="name"]');
      const messageInput = guestbookForm.querySelector('textarea[name="message"]');
      if (!nameInput.value.trim() || !messageInput.value.trim()) return;

      const newMsg = {
        id: Date.now(),
        name: nameInput.value.trim(),
        message: messageInput.value.trim(),
        timestamp: new Date().toISOString()
      };

      guestbookMessages.push(newMsg);
      localStorage.setItem("guestbookMessages", JSON.stringify(guestbookMessages));
      guestbookForm.reset();
      renderMessages();
    });

    renderMessages();
  }
});