// ==== Firebase Configuration ====
// Replace these with your actual Firebase project values
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// ==== DOM Elements (adjust IDs as needed) ====
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const logoutBtn = document.getElementById('logout-btn');
const authStatus = document.getElementById('auth-status');

// ==== Register User ====
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = registerForm['register-email'].value;
    const password = registerForm['register-password'].value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        alert("Registered successfully!");
        registerForm.reset();
      })
      .catch((err) => alert(err.message));
  });
}

// ==== Login User ====
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((cred) => {
        alert("Logged in!");
        loginForm.reset();
      })
      .catch((err) => alert(err.message));
  });
}

// ==== Logout ====
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    firebase.auth().signOut()
      .then(() => alert("Logged out."));
  });
}

// ==== Track Auth Status ====
firebase.auth().onAuthStateChanged((user) => {
  if (authStatus) {
    if (user) {
      authStatus.textContent = `Logged in as: ${user.email}`;
    } else {
      authStatus.textContent = "Not logged in.";
    }
  }
});