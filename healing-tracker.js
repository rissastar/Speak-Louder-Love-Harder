document.addEventListener("DOMContentLoaded", function () {
  const moodSelect = document.getElementById("mood");
  const reflectionBox = document.getElementById("reflection");

  // Create a confirmation message area
  const messageArea = document.createElement("div");
  messageArea.setAttribute("id", "healing-message");
  messageArea.style.marginTop = "1rem";
  moodSelect.parentElement.appendChild(messageArea);

  moodSelect.addEventListener("change", function () {
    const mood = moodSelect.value;
    let message = "";

    switch (mood) {
      case "happy":
        message = "😊 That’s great to hear. Celebrate the joy!";
        break;
      case "okay":
        message = "😐 Just okay is perfectly fine. You’re getting through.";
        break;
      case "sad":
        message = "😢 It’s okay to feel sad. Let yourself feel it.";
        break;
      case "anxious":
        message = "😰 Take a deep breath. You’re doing your best.";
        break;
      case "angry":
        message = "😠 Anger is valid. What triggered it?";
        break;
      case "tired":
        message = "🥱 Rest is healing. Listen to your body.";
        break;
      case "numb":
        message = "😶 Feeling numb is still a feeling. You’re not alone.";
        break;
      default:
        message = "";
        break;
    }

    messageArea.textContent = message;
  });
});