const db = firebase.firestore();

firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const nameEl = document.getElementById("user-name");
  const picEl = document.getElementById("dashboard-pic");
  const profileLink = document.getElementById("public-profile-link");

  db.collection("users").doc(user.uid).get().then(doc => {
    if (doc.exists) {
      const data = doc.data();
      nameEl.textContent = data.name || "Friend";
      if (data.photoURL) {
        picEl.src = data.photoURL;
      }
      profileLink.href = `public-profile.html?uid=${user.uid}`;
    }
  });

  loadGuestbookPosts(user.uid);
  loadEvents();
  loadBookmarks(user.uid);
  loadMoods(user.uid);
});

function loadGuestbookPosts(uid) {
  db.collection("guestbook")
    .where("userId", "==", uid)
    .orderBy("timestamp", "desc")
    .get()
    .then(snapshot => {
      const list = document.getElementById("guestbook-posts");
      list.innerHTML = snapshot.empty
        ? "<li>No entries yet. Start writing!</li>"
        : "";
      snapshot.forEach(doc => {
        const data = doc.data();
        const li = document.createElement("li");
        li.textContent = `${new Date(data.timestamp?.toDate()).toLocaleString()}: ${data.text}`;
        list.appendChild(li);
      });
    });
}

function loadEvents() {
  db.collection("events")
    .orderBy("date")
    .get()
    .then(snapshot => {
      const list = document.getElementById("event-list");
      list.innerHTML = snapshot.empty
        ? "<li>No upcoming events.</li>"
        : "";
      snapshot.forEach(doc => {
        const data = doc.data();
        const li = document.createElement("li");
        li.innerHTML = `<strong>${data.title}</strong><br>${new Date(data.date.toDate()).toLocaleString()}<br><a href="${data.link}" target="_blank">Join</a>`;
        list.appendChild(li);
      });
    });
}

function loadBookmarks(uid) {
  db.collection("bookmarks")
    .where("userId", "==", uid)
    .get()
    .then(snapshot => {
      const list = document.getElementById("bookmark-list");
      list.innerHTML = snapshot.empty
        ? "<li>No saved resources.</li>"
        : "";
      snapshot.forEach(doc => {
        const data = doc.data();
        const li = document.createElement("li");
        li.innerHTML = `<a href="${data.url}" target="_blank">${data.title}</a>`;
        list.appendChild(li);
      });
    });
}

function getAffirmation(mood) {
  const affirmations = {
    "😊 Happy": ["Keep shining your light!", "Happiness looks great on you!", "Celebrate this moment!"],
    "🙏 Grateful": ["Gratitude opens your heart.", "Keep appreciating the little things.", "You are attracting joy by being thankful."],
    "😰 Anxious": ["Breathe in, breathe out. You are safe.", "This feeling will pass. You are strong.", "You’ve handled tough things before — you will again."],
    "😢 Sad": ["It’s okay to not be okay.", "You’re not alone in how you feel.", "Let the tears fall — healing is happening."],
    "😠 Angry": ["Your emotions are valid.", "Take space and be gentle with yourself.", "You are in control, not your anger."]
  };
  const options = affirmations[mood] || ["You are doing your best. 💖"];
  return options[Math.floor(Math.random() * options.length)];
}

document.getElementById("mood-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const user = firebase.auth().currentUser;
  const mood = document.getElementById("mood-select").value;
  const note = document.getElementById("mood-note").value;

  db.collection("moods").add({
    userId: user.uid,
    mood,
    note,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  }).then(() => {
    alert("🌟 " + getAffirmation(mood));
    document.getElementById("mood-note").value = "";
    loadMoods(user.uid);
  });
});

function loadMoods(uid) {
  db.collection("moods")
    .where("userId", "==", uid)
    .orderBy("timestamp", "desc")
    .limit(10)
    .get()
    .then(snapshot => {
      const list = document.getElementById("mood-list");
      list.innerHTML = "";
      const moodEntries = [];

      snapshot.forEach(doc => {
        const data = doc.data();
        moodEntries.unshift(data); // for chronological order
        const li = document.createElement("li");
        li.innerHTML = `<strong>${data.mood}</strong> – ${new Date(data.timestamp?.toDate()).toLocaleDateString()}<br><em>${data.note || ''}</em>`;
        list.appendChild(li);
      });

      renderMoodChart(moodEntries);
    });
}

function renderMoodChart(entries) {
  const ctx = document.getElementById("mood-chart").getContext("2d");

  const moodMap = {
    "😊 Happy": { score: 5, color: "#66e26f" },
    "🙏 Grateful": { score: 4, color: "#90caf9" },
    "😰 Anxious": { score: 3, color: "#ffb74d" },
    "😢 Sad": { score: 2, color: "#ba68c8" },
    "😠 Angry": { score: 1, color: "#ef5350" }
  };

  const labels = entries.map(e => new Date(e.timestamp.toDate()).toLocaleDateString());
  const scores = entries.map(e => moodMap[e.mood]?.score || 0);
  const colors = entries.map(e => moodMap[e.mood]?.color || "#ccc");

  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Mood Level (1–5)',
        data: scores,
        borderColor: '#fff',
        backgroundColor: colors,
        pointBackgroundColor: colors,
        pointBorderColor: '#000',
        pointRadius: 6,
        fill: false,
        tension: 0.3
      }]
    },
    options: {
      scales: {
        y: {
          min: 0,
          max: 5,
          ticks: {
            stepSize: 1,
            callback: val => ["", "😠", "😢", "😰", "🙏", "😊"][val]
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: '#fff'
          }
        }
      }
    }
  });
}

document.getElementById("logout-btn").addEventListener("click", () => {
  firebase.auth().signOut().then(() => {
    window.location.href = "index.html";
  });
});