// healing-tracker.js

document.addEventListener('DOMContentLoaded', function () {
  const moodSelect = document.getElementById('mood');
  const reflectionText = document.getElementById('reflection');
  const saveButton = document.getElementById('saveEntry');
  const clearButton = document.getElementById('clearEntry');
  const exportButton = document.getElementById('exportEntry');
  const quoteDisplay = document.getElementById('quoteOfTheDay');

  // 🌟 Motivational Quotes
  const quotes = [
    "You are doing better than you think.",
    "Healing takes time, and that’s okay.",
    "Be proud of how far you’ve come.",
    "Every step forward is a step toward healing.",
    "You are not your struggles.",
    "Rest is part of the process."
  ];

  // Display random quote
  function showQuoteOfTheDay() {
    const today = new Date().toDateString();
    const storedQuote = localStorage.getItem('quoteOfTheDay');
    const storedDate = localStorage.getItem('quoteDate');

    if (storedDate === today && storedQuote) {
      quoteDisplay.textContent = `"${storedQuote}"`;
    } else {
      const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
      localStorage.setItem('quoteOfTheDay', newQuote);
      localStorage.setItem('quoteDate', today);
      quoteDisplay.textContent = `"${newQuote}"`;
    }
  }

  // Load saved entry
  function loadSavedEntry() {
    const savedMood = localStorage.getItem('savedMood');
    const savedReflection = localStorage.getItem('savedReflection');
    if (savedMood) moodSelect.value = savedMood;
    if (savedReflection) reflectionText.value = savedReflection;
  }

  // Save entry
  saveButton.addEventListener('click', () => {
    localStorage.setItem('savedMood', moodSelect.value);
    localStorage.setItem('savedReflection', reflectionText.value);
    alert('✅ Entry saved locally.');
  });

  // Clear entry
  clearButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear your saved entry?')) {
      localStorage.removeItem('savedMood');
      localStorage.removeItem('savedReflection');
      moodSelect.value = '';
      reflectionText.value = '';
      alert('🗑️ Entry cleared.');
    }
  });

  // Export entry
  exportButton.addEventListener('click', () => {
    const mood = moodSelect.value || 'Not selected';
    const reflection = reflectionText.value || 'No reflection written.';
    const date = new Date().toLocaleString();
    const content = `📝 Daily Healing Tracker\nDate: ${date}\nMood: ${mood}\n\nReflection:\n${reflection}\n`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'daily-healing-export.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });

  // Init
  loadSavedEntry();
  showQuoteOfTheDay();
});

// Optional: Floating emoji sparkle effect
function createEmoji() {
  const emojiList = ['✨', '💖', '🌈', '🌸', '🦋'];
  const emoji = document.createElement('div');
  emoji.classList.add('emoji');
  emoji.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];
  emoji.style.left = `${Math.random() * 100}vw`;
  emoji.style.top = '100vh';
  emoji.style.animationDuration = `${5 + Math.random() * 5}s`;
  document.body.appendChild(emoji);

  setTimeout(() => emoji.remove(), 10000);
}

setInterval(createEmoji, 800);