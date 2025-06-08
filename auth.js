// auth.js

function showRegister() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("register-form").style.display = "block";
  document.getElementById("login-error").textContent = "";
}

function showLogin() {
  document.getElementById("login-form").style.display = "block";
  document.getElementById("register-form").style.display = "none";
  document.getElementById("register-error").textContent = "";
}

function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "{}");
}

function saveUser(username, password) {
  const users = getUsers();
  users[username] = password;
  localStorage.setItem("users", JSON.stringify(users));
}

function login() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;
  const users = getUsers();
  const error = document.getElementById("login-error");

  if (users[username] && users[username] === password) {
    localStorage.setItem("currentUser", username);
    window.location.href = "index.html";
  } else {
    error.textContent = "❌ Incorrect username or password.";
  }
}

function register() {
  const username = document.getElementById("register-username").value.trim();
  const password = document.getElementById("register-password").value;
  const users = getUsers();
  const error = document.getElementById("register-error");

  if (!username || !password) {
    error.textContent = "⚠️ Please fill in both fields.";
    return;
  }

  if (users[username]) {
    error.textContent = "🚫 That username is already taken.";
    return;
  }

  saveUser(username, password);
  localStorage.setItem("currentUser", username);
  window.location.href = "index.html";
}

// Auto-redirect if already logged in
if (localStorage.getItem("currentUser")) {
  window.location.href = "index.html";
}