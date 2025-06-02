// Quotes array for motivational quote of the day
const quotes = [
  "Strength doesn’t come from what you can do. It comes from overcoming the things you once thought you couldn’t.",
  "Healing takes time, and asking for help is a courageous step.",
  "One small positive thought in the morning can change your whole day.",
  "You don’t have to control your thoughts. You just have to stop letting them control you.",
  "Every day may not be good, but there is something good in every day."
];

// Select random quote and display it
function displayQuote() {
  const quoteText = document.getElementById('quote-text');
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteText.textContent = quotes[randomIndex];
}
displayQuote();

// Elements
const moodSelect = document.getElementById('mood');
const reflectionTextarea = document.getElementById('reflection');
const saveBtn = document.getElementById('save-btn');
const clearBtn = document.getElementById('clear-btn');
const exportBtn = document.getElementById('export-btn');
const backBtn = document.getElementById('back-btn');

const STORAGE_KEY = 'dailyHealingEntry';

// Load saved data on page load
function loadEntry() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const entry = JSON.parse(saved);
      if (entry.mood) moodSelect.value = entry.mood;
      if (entry.reflection) reflectionTextarea.value = entry.reflection;
    } catch (e) {
      console.error('Error parsing saved entry:', e);
    }
  }
}
loadEntry();

// Save current entry to localStorage
saveBtn.addEventListener('click', () => {
  const mood = moodSelect.value;
  const reflection = reflectionTextarea.value.trim();
  if (!mood) {
    alert('Please select your mood before saving.');
    return;
  }
  const entry = { mood, reflection, timestamp: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
  alert('Your healing entry has been saved.');
});

// Clear saved entry and form fields
clearBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear your saved entry? This cannot be undone.')) {
    localStorage.removeItem(STORAGE_KEY);
    moodSelect.value = '';
    reflectionTextarea.value = '';
  }
});

// Export current entry as .txt file
exportBtn.addEventListener('click', () => {
  const mood = moodSelect.value;
  const reflection = reflectionTextarea.value.trim();
  if (!mood) {
    alert('Please select your mood before exporting.');
    return;
  }
  const exportText =
`Daily Healing Tracker Entry
Date: ${new Date().toLocaleString()}

Mood: ${moodSelect.options[moodSelect.selectedIndex].text}
Reflection:
${reflection || '(No additional reflection provided)'}`;

  const blob = new Blob([exportText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `healing-entry-${new Date().toISOString().slice(0,10)}.txt`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
});

// Go back button navigates back in browser history
backBtn.addEventListener('click', () => {
  window.history.back();
});