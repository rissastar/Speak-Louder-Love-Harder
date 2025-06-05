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

function updateQuote() {
  quoteElem.textContent = quotes[quoteIndex];
  quoteIndex = (quoteIndex + 1) % quotes.length;
}
setInterval(updateQuote, 5000); // Rotate every 5s

// ==== Theme Toggle (Dark/Light Mode) ====
const themeToggle = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "Light Mode";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const theme = document.body.classList.contains("dark") ? "dark" : "light";
  themeToggle.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
  localStorage.setItem("theme", theme);
});

// ==== Mobile Navigation (Hamburger Menu) ====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// ==== Firebase Auth Placeholder ====
// Note: You must include Firebase SDK via <script> tag or modules
// Then replace the firebaseConfig below with your actual config.

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase (uncomment when Firebase is set up)
// firebase.initializeApp(firebaseConfig);

// Example Firebase auth logic (for future integration)
/*
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("User signed in:", user.email);
  } else {
    console.log("No user signed in.");
  }
});
*/

firebase.auth().onAuthStateChanged((user) => {
  if (!user) return;
  const db = firebase.firestore();
  const userRef = db.collection("users").doc(user.uid);
  userRef.get().then((doc) => {
    if (doc.exists) {
      const data = doc.data();
      document.getElementById("mini-pic").src = data.photoURL || "default.png";
      document.getElementById("mini-name").textContent = data.name || user.email;
      document.getElementById("user-mini-profile").classList.remove("hidden");
    }
  });
});

firebase.auth().onAuthStateChanged((user) => {
  if (!user) return;

  const db = firebase.firestore();
  const userRef = db.collection("users").doc(user.uid);

  userRef.get().then((doc) => {
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

function showRandomAffirmation() {
  db.collection("affirmations")
    .orderBy("timestamp", "desc")
    .limit(50)
    .get()
    .then(snapshot => {
      const all = snapshot.docs.map(doc => doc.data().text);
      if (all.length > 0) {
        const quoteBox = document.getElementById("rotating-affirmation");
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
  showRandomAffirmation();
});