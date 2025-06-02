document.addEventListener("DOMContentLoaded", () => {
  const MOOD_STORAGE_KEY = "healingTrackerMood";
  const REFLECTION_STORAGE_KEY = "healingTrackerReflection";
  const PROMPT_STORAGE_KEY = "healingTrackerPrompt";

  const moodSelect = document.getElementById("mood");
  const reflectionTextarea = document.getElementById("reflection");
  const moodEmoji = document.getElementById("mood-emoji");
  const promptInput = document.getElementById("prompt");
  const newPromptBtn = document.getElementById("new-prompt-btn");

  const widgetPanel = document.getElementById("healing-panel");
  const widgetToggle = document.getElementById("healing-toggle");
  const widgetClose = document.getElementById("healing-close");

  const emojiMap = {
    happy: "😊",
    okay: "😐",
    sad: "😢",
    anxious: "😰",
    angry: "😠",
    tired: "🥱",
    numb: "😶",
    "": "😐", // default neutral face
  };

  const journalPrompts = [
    "What made you smile today?",
    "Describe one thing you're grateful for.",
    "Write about a challenge you overcame recently.",
    "What is something kind you did for yourself?",
    "How do you want to feel tomorrow?",
    "Name one thing you can improve in your daily routine.",
    "Write about someone who supports you.",
    "What’s a small victory you had today?",
    "How do you handle stress? Reflect on what works.",
    "Describe a place where you feel safe."
  ];

  // Update emoji display for current mood
  function updateMoodEmoji(moodValue) {
    moodEmoji.textContent = emojiMap[moodValue] || "😐";
  }

  // Save to localStorage
  function saveData() {
    localStorage.setItem(MOOD_STORAGE_KEY, moodSelect.value);
    localStorage.setItem(REFLECTION_STORAGE_KEY, reflectionTextarea.value);
    localStorage.setItem(PROMPT_STORAGE_KEY, promptInput.value);
  }

  // Load saved data from localStorage
  function loadSavedData() {
    const savedMood = localStorage.getItem(MOOD_STORAGE_KEY);
    const savedReflection = localStorage.getItem(REFLECTION_STORAGE_KEY);
    const savedPrompt = localStorage.getItem(PROMPT_STORAGE_KEY);

    if (savedMood) {
      moodSelect.value = savedMood;
      updateMoodEmoji(savedMood);
    } else {
      updateMoodEmoji("");
      moodSelect.value = "";
    }

    if (savedReflection) reflectionTextarea.value = savedReflection;
    else reflectionTextarea.value = "";

    if (savedPrompt && journalPrompts.includes(savedPrompt)) {
      promptInput.value = savedPrompt;
    } else {
      selectNewPrompt();
    }
  }

  // Pick a new random journal prompt
  function selectNewPrompt() {
    const randomIndex = Math.floor(Math.random() * journalPrompts.length);
    const prompt = journalPrompts[randomIndex];
    promptInput.value = prompt;
    localStorage.setItem(PROMPT_STORAGE_KEY, prompt);
  }

  // Event listeners
  moodSelect.addEventListener("change", () => {
    updateMoodEmoji(moodSelect.value);
    saveData();
  });

  reflectionTextarea.addEventListener("input", saveData);

  newPromptBtn.addEventListener("click", () => {
    selectNewPrompt();
  });

  // Widget open/close toggling with smooth slide
  widgetToggle.addEventListener("click", () => {
    if (widgetPanel.classList.contains("open")) {
      widgetPanel.classList.remove("open");
      widgetPanel.setAttribute("hidden", "");
      widgetToggle.setAttribute("aria-expanded", "false");
    } else {
      widgetPanel.classList.add("open");
      widgetPanel.removeAttribute("hidden");
      widgetToggle.setAttribute("aria-expanded", "true");
      loadSavedData();
      reflectionTextarea.focus();
    }
  });

  widgetClose.addEventListener("click", () => {
    widgetPanel.classList.remove("open");
    widgetPanel.setAttribute("hidden", "");
    widgetToggle.setAttribute("aria-expanded", "false");
  });

  // Initialize with closed widget and default emoji
  updateMoodEmoji("");
});