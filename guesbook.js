import { db } from './script.js';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// DOM elements
const form = document.getElementById('messageForm');
const nameInput = document.getElementById('name');
const messageInput = document.getElementById('message');
const messagesList = document.getElementById('messagesList');

// Add message to Firestore
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  if (name && message) {
    await addDoc(collection(db, 'guestbook'), {
      name,
      message,
      created: serverTimestamp()
    });

    form.reset();
  }
});

// Load and display messages
const q = query(collection(db, 'guestbook'), orderBy('created', 'desc'));
onSnapshot(q, (snapshot) => {
  messagesList.innerHTML = '';
  snapshot.forEach((doc) => {
    const data = doc.data();
    const li = document.createElement('li');
    li.innerHTML = `<strong>${data.name}:</strong> ${data.message}`;
    messagesList.appendChild(li);
  });
});