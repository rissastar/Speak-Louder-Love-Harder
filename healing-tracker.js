// healing-tracker.js

// Motivational quotes array
const quotes = [
  "Strength doesn’t come from what you can do. It comes from overcoming the things you once thought you couldn’t.",
  "Healing is a journey, not a destination.",
  "Every day may not be good, but there is something good in every day.",
  "Your present circumstances don't determine where you can go; they merely determine where you start.",
  "It’s okay to not be okay — take your time to heal.",
  "You are stronger than your struggles.",
];

// Elements
const quoteText = document.getElementById("quote-text");
const moodSelect = document.getElementById("mood");
const reflectionInput = document.getElementById("reflection");

const saveBtn = document.getElementById("save-btn");
const clearBtn = document.getElementById("clear-btn");
const exportBtn = document.getElementById("export-btn");
const backBtn = document.getElementById("back-btn");

// LocalStorage key
const STORAGE_KEY = "healingTrackerEntry";

// Display random motivational quote
function setRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteText.textContent = quotes[randomIndex];
}
setRandomQuote();

// Load saved entry from localStorage (if any)
function loadSavedEntry() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const entry = JSON.parse(saved);
      if (entry.mood) moodSelect.value = entry.mood;
      if (entry.reflection) reflectionInput.value = entry.reflection;
    } catch {
      // If parse error, clear localStorage to avoid confusion
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}
loadSavedEntry();

// Save entry to localStorage
function saveEntry() {
  if (!moodSelect.value) {
    alert("Please select your mood before saving.");
    return;
  }
  const entry = {
    mood: moodSelect.value,
    reflection: reflectionInput.value.trim(),
    savedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
  alert("Your healing entry has been saved temporarily.");
}

// Clear saved entry from localStorage and reset form
function clearEntry() {
  if (confirm("Are you sure you want to clear your saved entry?")) {
    localStorage.removeItem(STORAGE_KEY);
    moodSelect.value = "";
    reflectionInput.value = "";
    alert("Saved entry cleared.");
  }
}

// Export current entry to .txt file
function exportEntry() {
  if (!moodSelect.value) {
    alert("Please select your mood before exporting.");
    return;
  }
  const moodText = moodSelect.options[moodSelect.selectedIndex].text;
  const reflection = reflectionInput.value.trim() || "(No reflection written)";
  const dateStr = new Date().toLocaleString();

  const content = `Daily Healing Tracker Entry
Date: ${dateStr}

Mood: ${moodText}

Reflection:
${reflection}
`;

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `HealingTracker_${new Date().toISOString().slice(0,10)}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Go back button: use history.back()
function goBack() {
  window.history.back();
}

// Event listeners
saveBtn.addEventListener("click", saveEntry);
clearBtn.addEventListener("click", clearEntry);
exportBtn.addEventListener("click", exportEntry);
backBtn.addEventListener("click", goBack);