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