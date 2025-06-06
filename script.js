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

// ==== Theme Toggle ====
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
document.getElementById("hamburger")?.addEventListener("click", () => {
  document.getElementById("nav-links")?.classList.toggle("open");
});

// ==== Firebase Configuration ====
const firebaseConfig = {
  apiKey: "AIzaSyCzmBdZJrtHEoxcAHte2B8iMrea-ctSxy8",
  authDomain: "speak-louder-581d7.firebaseapp.com",
  projectId: "speak-louder-581d7",
  storageBucket: "speak-louder-581d7.appspot.com",
  messagingSenderId: "674769404942",
  appId: "1:674769404942:web:1cbda7d50ff15208dce85f",
  measurementId: "G-54XJLK1CGJ"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// ==== Tab Toggle Function ====
function showTab(tab) {
  const tabs = ["login", "register"];
  tabs.forEach((t) => {
    document.getElementById(`${t}-form`)?.classList.remove("active");
    document.getElementById(`${t}-tab`)?.classList.remove("active");
  });
  document.getElementById(`${tab}-form`)?.classList.add("active");
  document.getElementById(`${tab}-tab`)?.classList.add("active");
}

// ==== Auth State Change ====
auth.onAuthStateChanged(user => {
  if (user) {
    console.log("Logged in:", user.email);
    loadMiniProfile(user);
    showRandomAffirmation();
  } else {
    console.log("Not logged in.");
  }
});

// ==== Load Mini Profile ====
function loadMiniProfile(user) {
  const miniProfile = document.getElementById("user-mini-profile");
  const pic = document.getElementById("mini-pic");
  const name = document.getElementById("mini-name");

  db.collection("users").doc(user.uid).get().then(doc => {
    if (doc.exists) {
      const data = doc.data();
      if (pic && data.photoURL) pic.src = data.photoURL;
      if (name && data.name) name.textContent = data.name;
      miniProfile?.classList.remove("hidden");
    }
  });
}

// ==== Affirmation Rotator ====
function showRandomAffirmation() {
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
        setInterval(updateAffirmation, 10000);
      }
    });
}

// ==== Home Login Form ====
const homeLoginForm = document.getElementById("home-login-form");
if (homeLoginForm) {
  homeLoginForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("home-login-email").value;
    const password = document.getElementById("home-login-password").value;

    auth.signInWithEmailAndPassword(email, password)
      .then(() => window.location.href = "dashboard.html")
      .catch(err => document.getElementById("auth-message").textContent = err.message);
  });
}

// ==== Home Register Form ====
const homeRegisterForm = document.getElementById("register-form");
if (homeRegisterForm) {
  homeRegisterForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("home-register-name").value;
    const email = document.getElementById("home-register-email").value;
    const password = document.getElementById("home-register-password").value;

    auth.createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        return db.collection("users").doc(cred.user.uid).set({
          name,
          email,
          bio: "",
          photoURL: "",
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      })
      .then(() => window.location.href = "dashboard.html")
      .catch(err => document.getElementById("auth-message").textContent = err.message);
  });
}

// ==== Logout Button ====
document.getElementById("logout-btn")?.addEventListener("click", () => {
  auth.signOut().then(() => window.location.href = "login.html");
});