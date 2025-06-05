// Theme toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
  const html = document.documentElement;
  const newTheme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", newTheme);
});

// Color theme switch
document.getElementById("color-theme").addEventListener("change", (e) => {
  const color = e.target.value;
  document.documentElement.setAttribute("data-color", color);
});

// Quote rotator
const quotes = [
  "🌟 You are enough.",
  "🌈 Your voice matters.",
  "💖 Healing is not linear.",
  "✨ Keep shining.",
  "🔥 Speak louder. Love harder.",
  "🌻 You are not alone."
];
let quoteIndex = 0;
const quoteEl = document.querySelector(".quote-rotator");
function rotateQuote() {
  quoteEl.textContent = quotes[quoteIndex];
  quoteIndex = (quoteIndex + 1) % quotes.length;
}
setInterval(rotateQuote, 5000);
rotateQuote();

// Affirmation generator
const affirmations = [
  "I am strong and resilient.",
  "I radiate love and kindness.",
  "I believe in my healing.",
  "I am worthy of joy.",
  "My story matters.",
  "I choose hope every day."
];
document.getElementById("new-affirmation").addEventListener("click", () => {
  const affirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
  document.getElementById("affirmation-text").textContent = affirmation;
});

// Scroll to top button
const scrollBtn = document.getElementById("scrollToTopBtn");
window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Typing effect (once on load)
window.addEventListener("DOMContentLoaded", () => {
  const typeTarget = document.querySelector(".typewriter h2");
  const phrases = ["Inspire.", "Heal.", "Connect.", "Empower."];
  let i = 0, j = 0, currentPhrase = [], isDeleting = false;

  function loop() {
    const fullPhrase = phrases[i % phrases.length];
    if (!isDeleting && j <= fullPhrase.length) {
      currentPhrase = fullPhrase.slice(0, j++);
    } else if (isDeleting && j > 0) {
      currentPhrase = fullPhrase.slice(0, j--);
    }

    typeTarget.innerHTML = currentPhrase;

    if (!isDeleting && j === fullPhrase.length) {
      isDeleting = true;
      setTimeout(loop, 1000);
    } else if (isDeleting && j === 0) {
      isDeleting = false;
      i++;
      setTimeout(loop, 200);
    } else {
      setTimeout(loop, isDeleting ? 50 : 100);
    }
  }
  loop();
});

// Page loader
window.addEventListener("load", () => {
  document.getElementById("page-loader").classList.add("hidden");
});

// Scroll-triggered animation
const scrollElems = document.querySelectorAll("[data-scroll-animate]");
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});
scrollElems.forEach(el => scrollObserver.observe(el));

// Custom cursor
const cursor = document.getElementById("custom-cursor");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

const auth = firebase.auth();
const emailInput = document.getElementById("auth-email");
const passwordInput = document.getElementById("auth-password");
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const logoutBtn = document.getElementById("logout-btn");
const authMessage = document.getElementById("auth-message");

loginBtn.addEventListener("click", () => {
  auth.signInWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then(() => authMessage.textContent = "✅ Logged in!")
    .catch(err => authMessage.textContent = `❌ ${err.message}`);
});

registerBtn.addEventListener("click", () => {
  auth.createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then(() => authMessage.textContent = "✅ Registered!")
    .catch(err => authMessage.textContent = `❌ ${err.message}`);
});

logoutBtn.addEventListener("click", () => {
  auth.signOut().then(() => authMessage.textContent = "👋 Logged out!");
});

// Auth state listener
auth.onAuthStateChanged(user => {
  if (user) {
    authMessage.textContent = `👤 Logged in as ${user.email}`;
    logoutBtn.style.display = "inline-block";
    loginBtn.style.display = "none";
    registerBtn.style.display = "none";
  } else {
    authMessage.textContent = "🔒 Not logged in.";
    logoutBtn.style.display = "none";
    loginBtn.style.display = "inline-block";
    registerBtn.style.display = "inline-block";
  }
});

auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "login.html"; // or show login prompt
  }
});

const googleBtn = document.getElementById("google-login-btn");
const resetBtn = document.getElementById("reset-password-btn");
const resetEmail = document.getElementById("reset-email");

// GOOGLE LOGIN
googleBtn.addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      authMessage.textContent = `🌈 Welcome, ${user.displayName}`;
      saveExtraUserData(user); // save to Firestore (see below)
    })
    .catch(err => authMessage.textContent = `❌ ${err.message}`);
});

// PASSWORD RESET
resetBtn.addEventListener("click", () => {
  const email = resetEmail.value;
  auth.sendPasswordResetEmail(email)
    .then(() => authMessage.textContent = "📧 Reset email sent.")
    .catch(err => authMessage.textContent = `❌ ${err.message}`);
});

const db = firebase.firestore();
const usernameInput = document.getElementById("auth-username");

// Save extra data when registering
registerBtn.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  const username = usernameInput.value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
      return db.collection("users").doc(cred.user.uid).set({
        email,
        username,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    })
    .then(() => {
      authMessage.textContent = "✅ Registered and user saved!";
    })
    .catch(err => {
      authMessage.textContent = `❌ ${err.message}`;
    });
});

// Save Google login users too
function saveExtraUserData(user) {
  if (!user) return;
  db.collection("users").doc(user.uid).set({
    email: user.email,
    username: user.displayName || "Anonymous",
    photoURL: user.photoURL || "",
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }, { merge: true });
}

if (user) {
  db.collection("users").doc(user.uid).get().then(doc => {
    const data = doc.data();
    authMessage.innerHTML = `
      👋 Welcome <strong>${data.username}</strong><br>
      <img src="${data.photoURL || 'default-avatar.png'}" width="60" />
    `;
  });
}

// script.js
import { auth, db, storage } from './firebase-init.js';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";

// Get DOM elements
const emailLoginBtn = document.getElementById('emailLoginBtn');
const emailSignupBtn = document.getElementById('emailSignupBtn');
const googleLoginBtn = document.getElementById('googleLoginBtn');
const resetLink = document.getElementById('resetPasswordLink');
const displayNameInput = document.getElementById('displayNameInput');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const profileImageInput = document.getElementById('profileImageInput');
const authModal = document.getElementById('authModal');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const closeAuthBtn = document.getElementById('closeAuth');

// Show login modal
loginBtn.addEventListener('click', () => {
  authModal.style.display = 'block';
});

// Close modal when 'x' is clicked
closeAuthBtn.addEventListener('click', () => {
  authModal.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
  if (e.target == authModal) {
    authModal.style.display = 'none';
  }
});

// Email/Password login
emailLoginBtn.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location = 'profile.html';
    })
    .catch(error => console.error('Login error:', error));
});

// Email/Password sign-up
emailSignupBtn.addEventListener('click', async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  const displayName = displayNameInput.value;
  const file = profileImageInput.files[0];
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Update display name on auth profile
    if (displayName) {
      await updateProfile(user, { displayName: displayName });
    }
    // Upload profile image if provided
    let photoURL = null;
    if (file) {
      const storageRef = ref(storage, 'profileImages/' + user.uid);
      const snapshot = await uploadBytes(storageRef, file);
      photoURL = await getDownloadURL(snapshot.ref);
      await updateProfile(user, { photoURL: photoURL });
    }
    // Save user data in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      displayName: user.displayName || displayName,
      profileImageUrl: photoURL,
      theme: 'default',
      moodHistory: [],
      badges: []
    });
    window.location = 'profile.html';
  } catch (error) {
    console.error('Signup error:', error);
  }
});

// Google OAuth login
googleLoginBtn.addEventListener('click', async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    // Create or update Firestore doc for this user
    await setDoc(doc(db, 'users', user.uid), {
      displayName: user.displayName,
      profileImageUrl: user.photoURL || null,
      theme: 'default',
      moodHistory: [],
      badges: []
    }, { merge: true });
    window.location = 'profile.html';
  } catch (error) {
    console.error('Google sign-in error:', error);
  }
});

// Password reset link
resetLink.addEventListener('click', () => {
  const email = emailInput.value;
  if (!email) {
    alert('Please enter your email first.');
    return;
  }
  sendPasswordResetEmail(auth, email)
    .then(() => alert('Password reset email sent.'))
    .catch(error => console.error('Password reset error:', error));
});

// Listen for auth state changes to toggle UI and redirect
onAuthStateChanged(auth, (user) => {
  if (user) {
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
  } else {
    loginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
    // If on profile page without a user, redirect
    if (window.location.pathname.endsWith('profile.html')) {
      window.location = 'index.html';
    }
  }
});

// Logout button
logoutBtn.addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location = 'index.html';
  });
});

// Load profile data when on profile page
if (window.location.pathname.endsWith('profile.html')) {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Fetch user document from Firestore
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        document.getElementById('profileName').innerText = data.displayName;
        if (data.profileImageUrl) {
          document.getElementById('profileImage').src = data.profileImageUrl;
        }
        document.getElementById('profileTheme').innerText = data.theme;
        const moodList = document.getElementById('moodList');
        data.moodHistory.forEach(entry => {
          const li = document.createElement('li');
          li.innerText = `${entry.date}: ${entry.mood}`;
          moodList.appendChild(li);
        });
        const badgeList = document.getElementById('badgeList');
        data.badges.forEach(badge => {
          const li = document.createElement('li');
          li.innerText = badge;
          badgeList.appendChild(li);
        });
      }
    }
  });
}