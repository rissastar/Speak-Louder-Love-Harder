// ===== auth.js (Merged & Enhanced) =====

// Firebase Imports
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

import {
  getFirestore,
  doc,
  setDoc,
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
const form = document.getElementById('auth-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const usernameInput = document.getElementById('username');
const usernameField = document.getElementById('username-field');
const submitBtn = document.getElementById('submit-btn');
const toggleFormBtn = document.getElementById('toggle-form-btn');
const toggleMsg = document.getElementById('toggle-msg');
const googleLoginBtn = document.getElementById('google-login-btn');
const forgotPasswordBtn = document.getElementById('forgot-password-btn');
const authError = document.getElementById('auth-error');
const authSuccess = document.getElementById('auth-success');

let isLoginMode = true;

// Toggle Login/Register
if (toggleFormBtn) {
  toggleFormBtn.addEventListener('click', () => {
    isLoginMode = !isLoginMode;
    submitBtn.textContent = isLoginMode ? 'Login' : 'Register';
    toggleMsg.textContent = isLoginMode ? "Don't have an account?" : 'Already have an account?';
    toggleFormBtn.textContent = isLoginMode ? 'Register here' : 'Login here';
    usernameField.classList.toggle('hidden', isLoginMode);
    clearMessages();
  });
}

// Clear feedback
function clearMessages() {
  if (authError) authError.textContent = '';
  if (authSuccess) authSuccess.textContent = '';
}

// Handle Form Submission
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessages();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const username = usernameInput.value.trim();

    try {
      if (isLoginMode) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        if (!username) throw new Error('Username is required');
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: username });

        await setDoc(doc(db, 'users', cred.user.uid), {
          username: username,
          email: email,
          theme: 'theme-pink',
          badges: [],
          mood: 'neutral',
          createdAt: new Date().toISOString()
        });
      }

      authSuccess.textContent = 'Success! Redirecting...';
      setTimeout(() => (window.location.href = 'profile.html'), 1500);
    } catch (err) {
      authError.textContent = err.message;
    }
  });
}

// Google Login
if (googleLoginBtn) {
  googleLoginBtn.addEventListener('click', async () => {
    clearMessages();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        await setDoc(userRef, {
          username: user.displayName || 'GoogleUser',
          email: user.email,
          photoURL: user.photoURL || '',
          theme: 'theme-pink',
          badges: [],
          mood: 'neutral',
          createdAt: new Date().toISOString()
        });
      }

      authSuccess.textContent = 'Signed in with Google!';
      setTimeout(() => (window.location.href = 'profile.html'), 1500);
    } catch (err) {
      authError.textContent = err.message;
    }
  });
}

// Forgot Password
if (forgotPasswordBtn) {
  forgotPasswordBtn.addEventListener('click', async () => {
    clearMessages();
    const email = emailInput.value.trim();
    if (!email) {
      authError.textContent = 'Please enter your email first.';
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      authSuccess.textContent = 'Reset email sent!';
    } catch (err) {
      authError.textContent = err.message;
    }
  });
}

// Navbar Auth UI Handler
export function initAuthUI() {
  const loginLink = document.getElementById('login-link');
  const logoutBtn = document.getElementById('logout-btn');
  const profileLink = document.getElementById('profile-link');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      loginLink?.classList.add('hidden');
      logoutBtn?.classList.remove('hidden');
      profileLink?.classList.remove('hidden');
    } else {
      loginLink?.classList.remove('hidden');
      logoutBtn?.classList.add('hidden');
      profileLink?.classList.add('hidden');
    }
  });

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await signOut(auth);
      location.href = 'index.html';
    });
  }
}

// Export firebase instances
export { auth, db };