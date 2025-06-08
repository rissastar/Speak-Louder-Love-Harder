document.addEventListener("DOMContentLoaded", () => {
  /* -------------------------------
     DARK / LIGHT MODE TOGGLE
  -------------------------------- */
  const toggle = document.getElementById("mode-toggle");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light");
    toggle.checked = true;
  }

  toggle.addEventListener("change", () => {
    document.body.classList.toggle("light");
    const theme = document.body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", theme);
  });

  /* -------------------------------
     COLLAPSIBLE SECTIONS
  -------------------------------- */
  const collapsibles = document.querySelectorAll(".collapsible");

  collapsibles.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");
      const content = button.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  /* -------------------------------
     QUOTE CAROUSEL
  -------------------------------- */
  const quotes = [
    "💖 You are not alone.",
    "🌈 Healing is not linear.",
    "🌟 You matter. Always.",
    "🧠 It's okay to not be okay.",
    "🔥 Your story isn't over yet.",
  ];
  let quoteIndex = 0;
  const quoteEl = document.getElementById("quote-carousel");

  if (quoteEl) {
    function showQuote() {
      quoteEl.classList.remove("fadeIn");
      void quoteEl.offsetWidth; // reflow
      quoteEl.textContent = quotes[quoteIndex];
      quoteEl.classList.add("fadeIn");
      quoteIndex = (quoteIndex + 1) % quotes.length;
    }

    showQuote();
    setInterval(showQuote, 4000);
  }

  /* -------------------------------
     FLOATING HEARTS
  -------------------------------- */
  const heartContainer = document.getElementById("hearts-container");

  if (heartContainer) {
    function launchHeart() {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = "💖";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = (Math.random() * 2 + 6) + "s";
      heart.style.fontSize = Math.random() * 20 + 20 + "px";
      heartContainer.appendChild(heart);

      setTimeout(() => heart.remove(), 8000);
    }

    setInterval(launchHeart, 1000);
  }
});