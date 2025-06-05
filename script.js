document.addEventListener("DOMContentLoaded", () => {
  // Remove loader
  document.getElementById("loader").style.display = "none";

  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const prefersDark = localStorage.getItem("theme") === "dark";
  if (prefersDark) document.body.classList.add("dark");

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  });

  // Auto-Rotating Quotes
  const quotes = [
    "You are stronger than you think.",
    "Healing isn’t linear, but it is possible.",
    "Your voice matters. Your story matters.",
    "Even on your worst days, you are worthy of love.",
    "Every small step counts 💖"
  ];
  let current = 0;
  const quoteBox = document.getElementById("quote-box");

  function rotateQuotes() {
    quoteBox.textContent = quotes[current];
    current = (current + 1) % quotes.length;
    setTimeout(rotateQuotes, 5000);
  }

  if (quoteBox) rotateQuotes();
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCzmBdZJrtHEoxcAHte2B8iMrea-ctSxy8",
  authDomain: "speak-louder-581d7.firebaseapp.com",
  projectId: "speak-louder-581d7",
  storageBucket: "speak-louder-581d7.appspot.com",
  messagingSenderId: "674769404942",
  appId: "1:674769404942:web:1cbda7d50ff15208dce85f",
  measurementId: "G-54XJLK1CGJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };