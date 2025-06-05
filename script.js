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

import { auth, db, storage } from './script.js';
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import {
  doc, getDoc
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// DOM elements
const usernameEl = document.getElementById('username');
const emailEl = document.getElementById('email');
const themeEl = document.getElementById('theme-preference');
const profilePicEl = document.getElementById('profile-pic');
const logoutBtn = document.getElementById('logout-btn');
const favoriteQuotesEl = document.getElementById('favorite-quotes');

// Listen for user login
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = 'index.html';
    return;
  }

  emailEl.textContent = user.email;

  // Get user data from Firestore
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    usernameEl.textContent = data.username || "No Username Set";
    themeEl.textContent = data.theme || "Not saved yet";
    
    // Profile Picture
    if (data.profilePictureURL) {
      profilePicEl.src = data.profilePictureURL;
    }

    // Favorite quotes
    favoriteQuotesEl.innerHTML = '';
    (data.favoriteQuotes || []).forEach((quote) => {
      const li = document.createElement('li');
      li.textContent = quote;
      favoriteQuotesEl.appendChild(li);
    });

  } else {
    usernameEl.textContent = "No profile data found";
  }
});

// Logout
logoutBtn.addEventListener('click', async () => {
  await signOut(auth);
  window.location.href = 'index.html';
});

import { db } from './script.js';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// DOM elements
const form = document.getElementById('messageForm');
const nameInput = document.getElementById('name');
const messageInput = document.getElementById('message');
const messagesList = document.getElementById('messagesList');

// Add message to Firestore
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  if (name && message) {
    await addDoc(collection(db, 'guestbook'), {
      name,
      message,
      created: serverTimestamp()
    });

    form.reset();
  }
});

// Load and display messages
const q = query(collection(db, 'guestbook'), orderBy('created', 'desc'));
onSnapshot(q, (snapshot) => {
  messagesList.innerHTML = '';
  snapshot.forEach((doc) => {
    const data = doc.data();
    const li = document.createElement('li');
    li.innerHTML = `<strong>${data.name}:</strong> ${data.message}`;
    messagesList.appendChild(li);
  });
});