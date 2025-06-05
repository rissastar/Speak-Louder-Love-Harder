// profile.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

import {
  getFirestore,
  doc,
  getDoc
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCzmBdZJrtHEoxcAHte2B8iMrea-ctSxy8",
  authDomain: "speak-louder-581d7.firebaseapp.com",
  projectId: "speak-louder-581d7",
  storageBucket: "speak-louder-581d7.appspot.com",
  messagingSenderId: "674769404942",
  appId: "1:674769404942:web:1cbda7d50ff15208dce85f",
  measurementId: "G-54XJLK1CGJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM Elements
const displayUsername = document.getElementById('display-username');
const displayEmail = document.getElementById('display-email');
const profilePic = document.getElementById('profile-pic');
const quotesList = document.getElementById('quotes-list');
const logoutBtn = document.getElementById('logout-btn');
const profileError = document.getElementById('profile-error');

// Load user profile info
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  try {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      displayUsername.textContent = data.username || user.displayName || 'User';
      displayEmail.textContent = data.email || user.email;
      profilePic.src = data.photoURL || 'default-profile.png';
    } else {
      displayUsername.textContent = user.displayName || 'User';
      displayEmail.textContent = user.email;
    }

    // 🌟 Placeholder for quote history
    quotesList.innerHTML = `<li>✨ "You are stronger than your struggles."</li>`;
  } catch (err) {
    profileError.textContent = 'Error loading profile: ' + err.message;
  }
});

// Logout handler
logoutBtn.addEventListener('click', async () => {
  try {
    await signOut(auth);
    window.location.href = 'login.html';
  } catch (err) {
    profileError.textContent = 'Logout failed: ' + err.message;
  }
});