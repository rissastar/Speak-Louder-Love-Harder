// Healing Tracker JS with localStorage, confetti, mood color, export & clear

// Wait for DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  const moodSelect = document.getElementById('mood');
  const reflectionTextarea = document.getElementById('reflection');
  const saveBtn = document.getElementById('save-btn');
  const clearBtn = document.getElementById('clear-btn');
  const exportBtn = document.getElementById('export-btn');
  const backBtn = document.getElementById('back-btn');
  const QUOTE_TEXT = document.getElementById('quote-text');

  // Array of motivational quotes for daily rotation
  const quotes = [
    "Strength doesn’t come from what you can do. It comes from overcoming the things you once thought you couldn’t.",
    "Healing takes time, and asking for help is a courageous step.",
    "Small progress is still progress. Keep going.",
    "You are stronger than your struggles.",
    "Every day is a new beginning. Embrace it.",
    "It’s okay to not be okay. What matters is that you keep trying.",
    "Your feelings are valid. Honor them and grow."
  ];

  // Set a random quote on page load
  function setRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    QUOTE_TEXT.textContent = quotes[randomIndex];
  }

  // Apply mood color class to select element
  function applyMoodColor() {
    // Reset classes
    moodSelect.className = '';
    if (moodSelect.value) {
      moodSelect.classList.add('mood-' + moodSelect.value);
    }
  }

  // Save current entry to localStorage
  function saveEntry() {
    const mood = moodSelect.value;
    const reflection = reflectionTextarea.value.trim();

    if (!mood) {
      alert('Please select your mood before saving.');
      return;
    }

    const entry = {
      mood,
      reflection,
      date: new Date().toISOString()
    };

    localStorage.setItem('healingTrackerEntry', JSON.stringify(entry));

    alert('Your entry has been saved! 🎉');

    // Trigger confetti
    if (window.confetti) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }

  // Load entry from localStorage if exists
  function loadEntry() {
    const savedEntry = localStorage.getItem('healingTrackerEntry');
    if (savedEntry) {
      try {
        const entry = JSON.parse(savedEntry);
        moodSelect.value = entry.mood || '';
        reflectionTextarea.value = entry.reflection || '';
        applyMoodColor();
      } catch (e) {
        console.error('Error parsing saved entry:', e);
      }
    }
  }

  // Clear saved entry
  function clearEntry() {
    if (confirm('Are you sure you want to clear your saved entry?')) {
      localStorage.removeItem('healingTrackerEntry');
      moodSelect.value = '';
      reflectionTextarea.value = '';
      applyMoodColor();
      alert('Entry cleared.');
    }
  }

  // Export entry as .txt file
  function exportEntry() {
    const savedEntry = localStorage.getItem('healingTrackerEntry');
    if (!savedEntry) {
      alert('No saved entry to export.');
      return;
    }

    const entry = JSON.parse(savedEntry);
    const dateStr = new Date(entry.date).toLocaleString();
    const content = `Healing Tracker Entry\nDate: ${dateStr}\nMood: ${entry.mood}\nReflection:\n${entry.reflection}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `healing-entry-${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Back button event
  backBtn.addEventListener('click', () => {
    window.history.back();
  });

  // Event listeners
  moodSelect.addEventListener('change', () => {
    applyMoodColor();
  });

  saveBtn.addEventListener('click', () => {
    saveEntry();
  });

  clearBtn.addEventListener('click', () => {
    clearEntry();
  });

  exportBtn.addEventListener('click', () => {
    exportEntry();
  });

  // Initialize
  setRandomQuote();
  loadEntry();
  applyMoodColor();
});