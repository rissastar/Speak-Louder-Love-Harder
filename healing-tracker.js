// healing-tracker.js

// Quotes array
const quotes = [
  "🌟 Healing takes time, and that's okay.",
  "💪 Small steps forward are still progress.",
  "🌈 Every day is a new chance to grow.",
  "✨ You are stronger than you think.",
  "🌻 Let your heart be your guide today.",
  "🌱 Nourish your mind and soul.",
  "🌙 Even the darkest night will end.",
  "💖 Be gentle with yourself today.",
  "🌞 Shine bright, even through the clouds."
];

// DOM elements
const quoteText = document.getElementById("quote-text");
const moodSelect = document.getElementById("mood");
const reflectionTextarea = document.getElementById("reflection");
const saveBtn = document.getElementById("save-btn");
const clearBtn = document.getElementById("clear-btn");
const exportBtn = document.getElementById("export-btn");

// Function to pick and display a random quote with subtle animation
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteText.textContent = quotes[randomIndex];
  // Add subtle sparkle animation (class toggling)
  quoteText.classList.add("animate-emoji");
  setTimeout(() => quoteText.classList.remove("animate-emoji"), 3000);
}

// Load saved data from localStorage if any
function loadSavedEntry() {
  const saved = localStorage.getItem("healingTrackerEntry");
  if (saved) {
    try {
      const entry = JSON.parse(saved);
      if (entry.mood) moodSelect.value = entry.mood;
      if (entry.reflection) reflectionTextarea.value = entry.reflection;
    } catch (e) {
      console.warn("Failed to parse saved entry:", e);
    }
  }
}

// Save current form data to localStorage
function saveEntry() {
  const mood = moodSelect.value;
  const reflection = reflectionTextarea.value.trim();
  if (!mood) {
    alert("Please select your mood before saving.");
    return;
  }
  const entry = { mood, reflection, timestamp: new Date().toISOString() };
  localStorage.setItem("healingTrackerEntry", JSON.stringify(entry));
  alert("Your entry has been saved locally.");
}

// Clear saved data and reset form
function clearEntry() {
  localStorage.removeItem("healingTrackerEntry");
  moodSelect.value = "";
  reflectionTextarea.value = "";
  alert("Saved entry cleared.");
}

// Export current entry as a .txt file
function exportEntry() {
  const mood = moodSelect.value;
  const reflection = reflectionTextarea.value.trim();
  if (!mood) {
    alert("Please select your mood before exporting.");
    return;
  }
  const now = new Date();
  const filename = `Healing_Tracker_${now.toISOString().slice(0,10)}.txt`;
  const content = `Daily Healing Tracker Entry - ${now.toLocaleString()}

Mood: ${mood}
Reflection:
${reflection || "(No reflection added)"}
`;

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// Event listeners
saveBtn.addEventListener("click", saveEntry);
clearBtn.addEventListener("click", clearEntry);
exportBtn.addEventListener("click", exportEntry);

// On page load
window.addEventListener("DOMContentLoaded", () => {
  displayRandomQuote();
  loadSavedEntry();
});