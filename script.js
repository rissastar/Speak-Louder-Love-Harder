document.addEventListener("DOMContentLoaded", () => {

  // === 1. Smooth Scrolling ===
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetID = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetID);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
      closeMobileMenu();
    });
  });

  // === 2. Mobile Menu Toggle ===
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }
  function closeMobileMenu() {
    if (navMenu?.classList.contains("active")) {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  }

  // === 3. Fade-In Sections (.fade-in and .fade-in-on-scroll) ===
  const fadeElems = document.querySelectorAll(".fade-in, .fade-in-on-scroll");
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  fadeElems.forEach(elem => fadeObserver.observe(elem));

  // === 4. Guestbook Connect ===
  const guestbookForm = document.getElementById("guestbook-form");
  const guestbookList = document.getElementById("guestbook-list");
  let guestbookMessages = JSON.parse(localStorage.getItem("guestbookMessages")) || [];

  function renderGuestbookMessages() {
    if (!guestbookList) return;
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
  }

  function showGuestbookFeedback(msg, type) {
    let feedback = document.getElementById("guestbook-feedback");
    if (!feedback) {
      feedback = document.createElement("div");
      feedback.id = "guestbook-feedback";
      feedback.style.marginTop = "0.5em";
      guestbookForm.appendChild(feedback);
    }
    feedback.textContent = msg;
    feedback.className = type;
  }

  function escapeHTML(str) {
    return str.replace(/[&<>"']/g, (m) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[m]);
  }

  renderGuestbookMessages();

  if (guestbookForm) {
    guestbookForm.addEventListener("submit", e => {
      e.preventDefault();
      const nameInput = guestbookForm.querySelector('input[name="name"]');
      const messageInput = guestbookForm.querySelector('textarea[name="message"]');

      if (!nameInput.value.trim() || !messageInput.value.trim()) {
        showGuestbookFeedback("Please enter both your name and a message.", "error");
        return;
      }

      const newMessage = {
        id: Date.now(),
        name: nameInput.value.trim(),
        message: messageInput.value.trim(),
        timestamp: new Date().toISOString()
      };

      guestbookMessages.push(newMessage);
      localStorage.setItem("guestbookMessages", JSON.stringify(guestbookMessages));
      renderGuestbookMessages();
      guestbookForm.reset();
      showGuestbookFeedback("Thank you for your message!", "success");
    });
  }

  // === 5. Scroll Progress Bar ===
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('progress-bar').style.width = `${scrollPercent}%`;
  });

  // === 6. Dark Mode Toggle ===
  const darkToggle = document.getElementById('dark-mode-toggle');
  if (darkToggle) {
    const prefersDark = localStorage.getItem('theme') === 'dark';
    if (prefersDark) document.body.classList.add('dark-mode');

    darkToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
  }

  // === 7. Accessibility: aria-expanded ===
  document.querySelectorAll('details').forEach(detail => {
    const summary = detail.querySelector('summary');
    summary?.addEventListener('click', () => {
      setTimeout(() => {
        summary.setAttribute('aria-expanded', detail.open);
      }, 1);
    });
  });

  // === 8. Tab Logic ===
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

  // === 9. Journaling Checkbox Tracker ===
  document.querySelectorAll('input[data-journal-id]').forEach(box => {
    const key = `journal-${box.dataset.journalId}`;
    box.checked = localStorage.getItem(key) === 'true';
    box.addEventListener('change', () => {
      localStorage.setItem(key, box.checked);
    });
  });

  // === 10. Mood Chart + Check-In ===
  const ctx = document.getElementById('moodChart');
  if (ctx) {
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

    const form = document.getElementById('moodForm');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(form);
        const mood = formData.get('mood');
        const note = formData.get('note');
        const moodScoreMap = { '😢': 1, '😰': 2, '😐': 3, '😊': 4, '😄': 5 };
        const today = new Date().toISOString().split('T')[0];
        const newEntry = { date: today, mood, note, moodScore: moodScoreMap[mood] || 3 };
        const updatedData = moodData.filter(entry => entry.date !== today);
        updatedData.push(newEntry);
        localStorage.setItem('mood-tracker', JSON.stringify(updatedData));
        location.reload();
      });
    }

    document.getElementById('clearMoodData')?.addEventListener('click', () => {
      localStorage.removeItem('mood-tracker');
      location.reload();
    });
  }

  // === 11. Journaling Text Save ===
  document.querySelectorAll('textarea[data-journal-id]').forEach(area => {
    const key = `journal-text-${area.dataset.journalId}`;
    area.value = localStorage.getItem(key) || '';
    area.addEventListener('input', () => {
      localStorage.setItem(key, area.value);
    });
    }
    
    document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.querySelector('.theme-toggle');
  const body = document.body;

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.classList.toggle('dark-theme', savedTheme === 'dark');
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    // Save the current theme in localStorage
    const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
  });
});