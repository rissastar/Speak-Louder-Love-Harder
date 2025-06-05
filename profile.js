// ===== profile.js (Merged) =====

// Firebase Imports
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import {
  getAuth,
  onAuthStateChanged,
  signOut

<form id="profile-form" enctype="multipart/form-data">
  <label for="display-name">Display Name</label>
  <input type="text" id="display-name" placeholder="Enter your name" />

  <label for="bio">Bio</label>
  <textarea id="bio" placeholder="Tell us something about yourself"></textarea>

  <label for="profile-pic">Profile Picture</label>
  <input type="file" id="profile-pic" accept="image/*" />

  <img id="profile-pic-preview" src="" alt="Profile Preview" style="max-width: 150px; border-radius: 8px; margin-top: 10px;" />

  <button type="submit">Save Changes</button>
</form>
<p id="save-status"></p>

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

const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');
const profileTheme = document.getElementById('profile-theme');
const badgeList = document.getElementById('badge-list');
const moodStatus = document.getElementById('mood-status');

// Load User Data
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  try {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    const data = userSnap.exists() ? userSnap.data() : {};

    const username = data.username || user.displayName || 'User';
    const email = data.email || user.email;
    const photo = data.photoURL || 'default-profile.png';
    const theme = data.theme || 'theme-pink';
    const mood = data.mood || 'neutral';
    const badges = data.badges || [];

    // Top Display
    if (displayUsername) displayUsername.textContent = username;
    if (displayEmail) displayEmail.textContent = email;
    if (profilePic) profilePic.src = photo;

    // Full Profile
    if (profileName) profileName.textContent = username;
    if (profileEmail) profileEmail.textContent = email;
    if (profileTheme) profileTheme.textContent = theme;
    if (moodStatus) moodStatus.textContent = `Mood: ${mood}`;
    if (badgeList) {
      badgeList.innerHTML = '';
      badges.forEach(badge => {
        const li = document.createElement('li');
        li.textContent = badge;
        badgeList.appendChild(li);
      });
    }

    // Apply Theme
    document.body.classList.add(theme);

    // Quote History Placeholder
    if (quotesList) {
      quotesList.innerHTML = `<li>✨ "You are stronger than your struggles."</li>`;
    }
  } catch (err) {
    if (profileError) profileError.textContent = 'Error loading profile: ' + err.message;
  }
});

// Logout
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    try {
      await signOut(auth);
      window.location.href = 'login.html';
    } catch (err) {
      if (profileError) profileError.textContent = 'Logout failed: ' + err.message;
    }
  });
});