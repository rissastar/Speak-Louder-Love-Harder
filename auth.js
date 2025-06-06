// auth.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";

// ==== Firebase Config ====
const firebaseConfig = {
  apiKey: "AIzaSyCzmBdZJrtHEoxcAHte2B8iMrea-ctSxy8",
  authDomain: "speak-louder-581d7.firebaseapp.com",
  projectId: "speak-louder-581d7",
  storageBucket: "speak-louder-581d7.firebasestorage.app",
  messagingSenderId: "674769404942",
  appId: "1:674769404942:web:1cbda7d50ff15208dce85f",
  measurementId: "G-54XJLK1CGJ"
};

// ==== Initialize Firebase ====
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// ==== Redirect if not logged in (for protected pages) ====
const protectedPages = ['dashboard.html', 'profile.html']; // add other protected pages here
const currentPage = window.location.pathname.split("/").pop();

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User logged in:", user.email);
    updateMiniProfile(user);
  } else {
    if (protectedPages.includes(currentPage)) {
      window.location.href = "login.html";
    }
  }
});

// ==== Mini-profile UI update ====
function updateMiniProfile(user) {
  const miniProfile = document.getElementById("mini-profile");
  if (!miniProfile) return;

  // Show user email
  miniProfile.innerHTML = `
    <p>Logged in as: ${user.email}</p>
    <img src="${user.photoURL || 'default-profile.png'}" alt="Profile Pic" style="width:50px; height:50px; border-radius:50%;" />
  `;
}

// ==== Register ====
const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value;
    const profilePicFile = document.getElementById("register-profile-pic")?.files[0];

    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let photoURL = null;

      if (profilePicFile) {
        // Upload profile picture to Firebase Storage
        const storageRef = ref(storage, `profile_pictures/${user.uid}/${profilePicFile.name}`);
        await uploadBytes(storageRef, profilePicFile);

        // Get download URL
        photoURL = await getDownloadURL(storageRef);

        // Update user profile with photoURL
        await updateProfile(user, { photoURL });
      }

      // Create Firestore user doc
      await setDoc(doc(db, "users", user.uid), {
        email,
        createdAt: serverTimestamp(),
        photoURL: photoURL || null,
      });

      window.location.href = "dashboard.html";
    } catch (error) {
      alert("Registration error: " + error.message);
    }
  });
}

// ==== Login ====
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "dashboard.html";
    } catch (error) {
      alert("Login error: " + error.message);
    }
  });
}

// ==== Logout ====
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      window.location.href = "login.html";
    } catch (error) {
      alert("Logout error: " + error.message);
    }
  });
}