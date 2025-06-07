// Firebase config (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyCzmBdZJrtHEoxcAHte2B8iMrea-ctSxy8",
  authDomain: "speak-louder-581d7.firebaseapp.com",
  projectId: "speak-louder-581d7",
  storageBucket: "speak-louder-581d7.firebasestorage.app",
  messagingSenderId: "674769404942",
  appId: "1:674769404942:web:1cbda7d50ff15208dce85f",
  measurementId: "G-54XJLK1CGJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const errorMsg = document.getElementById("errorMsg");

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const displayName = document.getElementById("displayName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const profilePicInput = document.getElementById("profilePic");

    errorMsg.style.display = "none";
    errorMsg.textContent = "";

    if (password !== confirmPassword) {
      errorMsg.textContent = "Passwords do not match.";
      errorMsg.style.display = "block";
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      let profilePicUrl = "";

      // Upload profile picture if selected
      if (profilePicInput && profilePicInput.files.length > 0) {
        const file = profilePicInput.files[0];
        const storageRef = storage.ref().child(`profile_pics/${user.uid}`);
        await storageRef.put(file);
        profilePicUrl = await storageRef.getDownloadURL();
      }

      // Update Firebase Auth user profile
      await user.updateProfile({
        displayName,
        photoURL: profilePicUrl || null
      });

      // Save user info to Firestore
      await db.collection("users").doc(user.uid).set({
        uid: user.uid,
        displayName,
        email,
        photoURL: profilePicUrl || "",
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      // Redirect to dashboard or homepage after successful registration
      window.location.href = "dashboard.html";

    } catch (error) {
      errorMsg.textContent = error.message;
      errorMsg.style.display = "block";
    }
  });
});