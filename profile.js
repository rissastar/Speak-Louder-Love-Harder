import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

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

const displayUsername = document.getElementById('display-username');
const displayEmail = document.getElementById('display-email');
const profilePic = document.getElementById('profile-pic');
const quotesList = document.getElementById('quotes-list');
const logoutBtn = document.getElementById('logout-btn');
const profileError = document.getElementById('profile-error');

// Load user data when authenticated
onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        displayUsername.textContent = data.username;
        displayEmail.textContent = user.email;
        if (data.photoURL) profilePic.src = data.photoURL;
      } else {
        displayUsername.textContent = user.displayName || 'User';
        displayEmail.textContent = user.email;
      }

      // Load future quotes here (placeholder for now)
      quotesList.innerHTML = `<li>✨ Keep going, you're doing great.</li>`;
    } catch (error) {
      profileError.textContent = error.message;
    }
  } else {
    window.location.href = 'login.html';
  }
});

// Logout
logoutBtn.addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location.href = 'login.html';
  });
});