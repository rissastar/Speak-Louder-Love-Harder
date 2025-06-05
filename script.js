// ==== Inspirational Quotes Rotator ====
const quotes = [
  "You are not alone.",
  "One day at a time, one step at a time.",
  "Your story matters and your voice is heard.",
  "Together, we can make a difference.",
  "Spread love, spread hope."
];

let quoteIndex = 0;
const quoteElem = document.getElementById("quote");
if (quoteElem) {
  function updateQuote() {
    quoteElem.textContent = quotes[quoteIndex];
    quoteIndex = (quoteIndex + 1) % quotes.length;
  }
  updateQuote();
  setInterval(updateQuote, 5000);
}

// ==== Theme Toggle (Dark/Light Mode) ====
const themeToggle = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "Light Mode";
}
themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const theme = document.body.classList.contains("dark") ? "dark" : "light";
  themeToggle.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
  localStorage.setItem("theme", theme);
});

// ==== Mobile Navigation ====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
hamburger?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// ==== Firebase Auth Listener & Mini Profile ====
firebase.auth().onAuthStateChanged(user => {
  if (!user) return;
  const db = firebase.firestore();
  const userRef = db.collection("users").doc(user.uid);

  userRef.get().then(doc => {
    if (doc.exists) {
      const data = doc.data();
      const miniProfile = document.getElementById("user-mini-profile");
      const pic = document.getElementById("mini-pic");
      const name = document.getElementById("mini-name");

      if (pic && data.photoURL) pic.src = data.photoURL;
      if (name && data.name) name.textContent = data.name;
      miniProfile?.classList.remove("hidden");
    }
  });
});

// ==== Affirmation Rotator ====
function showRandomAffirmation() {
  const db = firebase.firestore();
  const quoteBox = document.getElementById("rotating-affirmation");
  if (!quoteBox) return;

  db.collection("affirmations")
    .orderBy("timestamp", "desc")
    .limit(50)
    .get()
    .then(snapshot => {
      const all = snapshot.docs.map(doc => doc.data().text);
      if (all.length > 0) {
        let index = 0;
        function updateAffirmation() {
          quoteBox.textContent = `"${all[index]}"`;
          index = (index + 1) % all.length;
        }
        updateAffirmation();
        setInterval(updateAffirmation, 10000); // every 10 sec
      }
    });
}
firebase.auth().onAuthStateChanged(user => {
  if (user) showRandomAffirmation();
});

// ==== Profile Form Handling (if present on page) ====
firebase.auth().onAuthStateChanged(user => {
  if (!user) return;

  const emailSpan = document.getElementById("user-email");
  const form = document.getElementById("profile-form");
  const nameInput = document.getElementById("display-name");
  const bioInput = document.getElementById("bio");
  const picInput = document.getElementById("profile-pic");
  const previewImg = document.getElementById("profile-pic-preview");
  const saveStatus = document.getElementById("save-status");

  const db = firebase.firestore();
  const storage = firebase.storage();
  const userRef = db.collection("users").doc(user.uid);

  emailSpan && (emailSpan.textContent = user.email);

  // Load existing user data
  userRef.get().then(doc => {
    if (doc.exists) {
      const data = doc.data();
      if (nameInput) nameInput.value = data.name || "";
      if (bioInput) bioInput.value = data.bio || "";
      if (previewImg && data.photoURL) previewImg.src = data.photoURL;
    }
  });

  if (form) {
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const name = nameInput.value;
      const bio = bioInput.value;
      let photoURL = previewImg?.src;

      const file = picInput.files[0];
      if (file) {
        // Secure upload check
        if (!file.type.startsWith("image/")) {
          alert("Only image files allowed.");
          return;
        }
        if (file.size > 2 * 1024 * 1024) {
          alert("Image must be under 2MB.");
          return;
        }

        const storageRef = storage.ref(`profile-pics/${user.uid}`);
        await storageRef.put(file);
        photoURL = await storageRef.getDownloadURL();
        if (previewImg) previewImg.src = photoURL;
      }

      userRef.set({ name, bio, photoURL }).then(() => {
        if (saveStatus) {
          saveStatus.textContent = "Profile updated ✅";
          setTimeout(() => (saveStatus.textContent = ""), 3000);
        }
      });
    });
  }
});

// ==== Firebase Configuration ====
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
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// ==== Register ====
const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    try {
      const userCred = await auth.createUserWithEmailAndPassword(email, password);
      const uid = userCred.user.uid;

      // Create a user doc
      await db.collection("users").doc(uid).set({
        email: email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      window.location.href = "dashboard.html";
    } catch (err) {
      alert("Registration error: " + err.message);
    }
  });
}

// ==== Login ====
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      window.location.href = "dashboard.html";
    } catch (err) {
      alert("Login error: " + err.message);
    }
  });
}

// ==== Logout ====
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    auth.signOut().then(() => {
      window.location.href = "login.html";
    });
  });
}

// ==== Auth State Change (for profile mini-display or redirect logic) ====
auth.onAuthStateChanged(user => {
  if (user) {
    // If needed, populate mini-profile or update UI
    console.log("Logged in as:", user.email);
  } else {
    console.log("Not logged in.");
  }
});