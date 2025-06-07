// ===== QUOTES ROTATOR =====
const quotes = [
  { text: "You are stronger than you think.", author: "Unknown" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Every day is a second chance.", author: "Unknown" },
  { text: "Your story isn't over yet.", author: "Unknown" },
  { text: "Speak louder, love harder.", author: "Unknown" },
];

function showQuote() {
  const quoteEl = document.getElementById("quoteText");
  const authorEl = document.getElementById("quoteAuthor");
  if (!quoteEl || !authorEl) return;

  const index = Math.floor(Math.random() * quotes.length);
  quoteEl.textContent = `💬 "${quotes[index].text}"`;
  authorEl.textContent = `— ${quotes[index].author}`;
}
setInterval(showQuote, 8000);
showQuote();

// ===== THEME SWITCHER =====
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("change", (e) => {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  });

  // Load saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.checked = true;
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    themeToggle.checked = false;
  }
}

// ===== TABS =====
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.target;
    tabContents.forEach((content) => {
      content.style.display = content.id === target ? "block" : "none";
    });
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

// Initialize first tab active if any
if (tabButtons.length > 0) {
  tabButtons[0].click();
}

// ===== COLLAPSIBLES =====
const collapsibles = document.querySelectorAll(".collapsible");
collapsibles.forEach((collapsible) => {
  collapsible.addEventListener("click", () => {
    collapsible.classList.toggle("active");
    const content = collapsible.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// ===== NAVIGATION HIGHLIGHT ON SCROLL =====
// Optional: highlight nav links based on section in viewport
const navLinks = document.querySelectorAll("nav a[href^='#']");
window.addEventListener("scroll", () => {
  let fromTop = window.scrollY + 60;

  navLinks.forEach((link) => {
    let section = document.querySelector(link.hash);
    if (!section) return;
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

// ===== UTILITY: SMOOTH SCROLL FOR ANCHORS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const targetEl = document.querySelector(this.getAttribute("href"));
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});