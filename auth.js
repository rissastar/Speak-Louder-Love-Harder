// auth.js

// Import Firebase modules (if using modules) or include Firebase SDK in HTML before this script

// Your Firebase config (use your actual config here)
const firebaseConfig = {
  apiKey: "AIzaSyCzmBdZJrtHEoxcAHte2B8iMrea-ctSxy8",
  authDomain: "speak-louder-581d7.firebaseapp.com",
  projectId: "speak-louder-581d7",
  storageBucket: "speak-louder-581d7.firebasestorage.app",
  messagingSenderId: "674769404942",
  appId: "1:674769404942:web:1cbda7d50ff15208dce85f",
  measurementId: "G-54XJLK1CGJ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// LOGIN FUNCTION
function login(email, password) {
  return auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Successful login
      const user = userCredential.user;
      console.log("Logged in as:", user.email);
      // Redirect or update UI here
      window.location.href = "dashboard.html"; // example redirect
    })
    .catch((error) => {
      console.error("Login error:", error.message);
      alert("Login failed: " + error.message);
    });
}

// LOGOUT FUNCTION
function logout() {
  auth.signOut()
    .then(() => {
      console.log("Logged out");
      window.location.href = "index.html"; // example redirect after logout
    })
    .catch((error) => {
      console.error("Logout error:", error);
    });
}

// AUTH STATE LISTENER (optional, to detect login state changes)
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("User is logged in:", user.email);
    // You can show user info or redirect if needed
  } else {
    console.log("User is logged out");
  }
});

// ===== BIND LOGIN FORM =====
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = loginForm.email.value.trim();
      const password = loginForm.password.value;
      login(email, password);
    });
  }
});