// healing-tracker.js

// Purple-themed confetti burst using canvas-confetti library
function launchConfetti() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  const colors = ['#d500f9', '#9575cd', '#673ab7', '#512da8', '#4a148c', '#b39ddb'];

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti(Object.assign({}, defaults, { 
      particleCount, 
      origin: { x: Math.random(), y: Math.random() - 0.2 },
      colors: colors
    }));
  }, 250);
}

// Update mood dropdown text color based on selection (purple palette)
function updateMoodColor() {
  const moodColors = {
    happy: '#d500f9',
    okay: '#9575cd',
    sad: '#673ab7',
    anxious: '#512da8',
    angry: '#b71c1c',   // kept red for angry to stand out
    tired: '#4a148c',
    numb: '#9e9e9e',
  };

  const moodSelect = document.getElementById('mood');
  const selectedMood = moodSelect.value;

  if (moodColors[selectedMood]) {
    moodSelect.style.color = moodColors[selectedMood];
  } else {
    moodSelect.style.color = '#512da8'; // default purple
  }
}

// Export form content to a .txt file and trigger confetti
function exportEntry() {
  const moodSelect = document.getElementById('mood');
  const mood = moodSelect.value;
  const reflection = document.getElementById('reflection').value.trim();

  if (!mood) {
    alert('Please select your mood before exporting.');
    return;
  }

  const moodTextMap = {
    happy: '😊 Happy',
    okay: '😐 Okay',
    sad: '😢 Sad',
    anxious: '😰 Anxious',
    angry: '😠 Angry',
    tired: '🥱 Tired',
    numb: '😶 Numb',
  };

  const date = new Date().toLocaleString();

  const content = `Daily Healing Tracker Entry\nDate: ${date}\n\nMood: ${moodTextMap[mood]}\n\nReflection:\n${reflection || '[No reflection provided]'}\n`;

  // Create blob and trigger download
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Healing_Tracker_Entry_${new Date().toISOString().slice(0,10)}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  launchConfetti();
}

// Back button handler
function goBack() {
  window.history.back();
}

// Set up event listeners on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const exportBtn = document.getElementById('export-btn');
  const backBtn = document.getElementById('back-btn');
  const moodSelect = document.getElementById('mood');

  exportBtn.addEventListener('click', exportEntry);
  backBtn.addEventListener('click', goBack);
  moodSelect.addEventListener('change', updateMoodColor);

  // Initialize mood dropdown color on page load
  updateMoodColor();
});