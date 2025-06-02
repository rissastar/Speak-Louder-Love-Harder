document.addEventListener("DOMContentLoaded", function () {
  const moodSelect = document.getElementById("mood");
  const reflectionBox = document.getElementById("reflection");
  const messageArea = document.createElement("div");
  const quoteArea = document.createElement("div");

  // --- Quotes of the Day ---
  const quotes = [
    "🌟 Healing isn’t linear — be gentle with yourself.",
    "💪 You’ve survived 100% of your worst days so far.",
    "🌈 Even small steps forward still count as progress.",
    "🧘‍♀️ Peace begins with giving yourself grace.",
    "☀️ Every day is a new chance to heal.",
    "🌻 You are doing better than you think."
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteArea.textContent = `Quote of the Day: "${randomQuote}"`;
  quoteArea.className = "healing-quote";
  moodSelect.closest("form").insertAdjacentElement("beforebegin", quoteArea);

  // --- Confirmation message based on mood ---
  messageArea.setAttribute("id", "healing-message");
  messageArea.style.marginTop = "1rem";
  moodSelect.parentElement.appendChild(messageArea);

  const updateMessage = (mood) => {
    const moodMessages = {
      happy: "😊 That’s great to hear. Celebrate the joy!",
      okay: "😐 Just okay is perfectly fine. You’re getting through.",
      sad: "😢 It’s okay to feel sad. Let yourself feel it.",
      anxious: "😰 Take a deep breath. You’re doing your best.",
      angry: "😠 Anger is valid. What triggered it?",
      tired: "🥱 Rest is healing. Listen to your body.",
      numb: "😶 Feeling numb is still a feeling. You’re not alone."
    };
    messageArea.textContent = moodMessages[mood] || "";
  };

  // --- Load from localStorage if available ---
  const savedMood = localStorage.getItem("healing-mood");
  const savedReflection = localStorage.getItem("healing-reflection");

  if (savedMood) {
    moodSelect.value = savedMood;
    updateMessage(savedMood);
  }
  if (savedReflection) {
    reflectionBox.value = savedReflection;
  }

  // --- Save to localStorage when changed ---
  moodSelect.addEventListener("change", function () {
    const selectedMood = moodSelect.value;
    localStorage.setItem("healing-mood", selectedMood);
    updateMessage(selectedMood);
  });

  reflectionBox.addEventListener("input", function () {
    localStorage.setItem("healing-reflection", reflectionBox.value);
  });

  // --- Save Place Note ---
  const saveNote = document.createElement("p");
  saveNote.textContent = "💾 Your mood and reflection are saved safely on your device.";
  saveNote.className = "save-note";
  reflectionBox.parentElement.appendChild(saveNote);
});