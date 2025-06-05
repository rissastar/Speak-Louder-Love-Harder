 <script>
  const emailSpan = document.getElementById("user-email");
  const form = document.getElementById("profile-form");
  const nameInput = document.getElementById("display-name");
  const bioInput = document.getElementById("bio");
  const picInput = document.getElementById("profile-pic");
  const previewImg = document.getElementById("profile-pic-preview");
  const saveStatus = document.getElementById("save-status");

  const db = firebase.firestore();
  const storage = firebase.storage();

  let currentUser = null;

  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "login.html";
      return;
    }

    currentUser = user;
    emailSpan.textContent = user.email;

    const userRef = db.collection("users").doc(user.uid);

    userRef.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        nameInput.value = data.name || "";
        bioInput.value = data.bio || "";
        if (data.photoURL) {
          previewImg.src = data.photoURL;
        }
      }
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = nameInput.value;
      const bio = bioInput.value;
      let photoURL = previewImg.src;

      // Upload image if new file selected
      if (picInput.files[0]) {
        const file = picInput.files[0];
        const storageRef = storage.ref(`profile-pics/${user.uid}`);
        await storageRef.put(file);
        photoURL = await storageRef.getDownloadURL();
      }

      // Save to Firestore
      userRef.set({ name, bio, photoURL }).then(() => {
        saveStatus.textContent = "Profile updated ✅";
        setTimeout(() => (saveStatus.textContent = ""), 3000);
      });
    });
  });
</script>

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = nameInput.value;
  const bio = bioInput.value;
  let photoURL = previewImg.src;

  const file = picInput.files[0];

  // Secure upload
  if (file) {
    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) { // 2 MB limit
      alert("Image must be under 2MB.");
      return;
    }

    const storageRef = storage.ref(`profile-pics/${currentUser.uid}`);
    await storageRef.put(file);
    photoURL = await storageRef.getDownloadURL();
  }

  // Save to Firestore
  userRef.set({ name, bio, photoURL }).then(() => {
    saveStatus.textContent = "Profile updated ✅";
    setTimeout(() => (saveStatus.textContent = ""), 3000);
  });
});