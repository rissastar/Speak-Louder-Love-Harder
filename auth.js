import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

import { getFirestore, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

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

// Toggle between Login and Register modes
toggleFormBtn.addEventListener('click', () => {
  isLoginMode = !isLoginMode;
  if (isLoginMode) {
    submitBtn.textContent = 'Login';
    toggleMsg.textContent = "Don't have an account?";
    toggleFormBtn.textContent = "Register here";
    usernameField.classList.add('hidden');
  } else {
    submitBtn.textContent = 'Register';
    toggleMsg.textContent = "Already have an account?";
    toggleFormBtn.textContent = "Login here";
    usernameField.classList.remove('hidden');
  }
  clearMessages();
});

// Clear error and success messages
function clearMessages() {
  authError.textContent = '';
  authSuccess.textContent = '';
}

// Handle form submit for login or register
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearMessages();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const username = usernameInput.value.trim();

  if (isLoginMode) {
    // Login
    try {
      await signInWithEmailAndPassword(auth, email, password);
      authSuccess.textContent = 'Login successful! Redirecting...';
      setTimeout(() => {
        window.location.href = 'profile.html';
      }, 1500);
    } catch (error) {
      authError.textContent = error.message;
    }
  } else {
    // Register
    if (!username) {
      authError.textContent = 'Please enter a username.';
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Save additional user info in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        username,
        email,
        createdAt: new Date().toISOString()
      });
      authSuccess.textContent = 'Registration successful! Redirecting...';
      setTimeout(() => {
        window.location.href = 'profile.html';
      }, 1500);
    } catch (error) {
      authError.textContent = error.message;
    }
  }
});

// Google Login
googleLoginBtn.addEventListener('click', async () => {
  clearMessages();
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if user data exists in Firestore, create if not
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        username: user.displayName || 'Google User',
        email: user.email,
        createdAt: new Date().toISOString(),
        photoURL: user.photoURL || ''
      });
    }
    authSuccess.textContent = 'Google sign-in successful! Redirecting...';
    setTimeout(() => {
      window.location.href = 'profile.html';
    }, 1500);
  } catch (error) {
    authError.textContent = error.message;
  }
});

// Forgot Password
forgotPasswordBtn.addEventListener('click', () => {
  clearMessages();
  const email = emailInput.value.trim();
  if (!email) {
    authError.textContent = 'Please enter your email to reset password.';
    return;
  }
  sendPasswordResetEmail(auth, email)
    .then(() => {
      authSuccess.textContent = 'Password reset email sent! Check your inbox.';
    })
    .catch((error) => {
      authError.textContent = error.message;
    });
});