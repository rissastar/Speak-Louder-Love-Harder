// healing-tracker.js

// Confetti function using canvas-confetti library
function launchConfetti() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 }}));
  }, 250);
}

// Export form content to a .txt file
function exportEntry() {
  const mood = document.getElementById('mood').value;
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

  let content = `Daily Healing Tracker Entry\nDate: ${date}\n\nMood: ${moodTextMap[mood]}\n\nReflection:\n${reflection || '[No reflection provided]'}\n`;

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

// Attach event listeners after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const exportBtn = document.getElementById('export-btn');
  const backBtn = document.getElementById('back-btn');

  exportBtn.addEventListener('click', exportEntry);
  backBtn.addEventListener('click', goBack);
});