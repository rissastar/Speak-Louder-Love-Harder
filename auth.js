// Show the register form and hide login
function showRegister() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("register-form").style.display = "block";
  document.getElementById("login-error").textContent = "";
}

// Show the login form and hide register
function showLogin() {
  document.getElementById("login-form").style.display = "block";
  document.getElementById("register-form").style.display = "none";
  document.getElementById("register-error").textContent = "";
}

// Retrieve stored users from localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "{}");
}

// Save a new user to localStorage
function saveUser(username, password) {
  const users = getUsers();
  users[username] = password;
  localStorage.setItem("users", JSON.stringify(users));
}

// Handle login process
function login() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;
  const users = getUsers();
  const error = document.getElementById("login-error");

  if (users[username] && users[username] === password) {
    localStorage.setItem("currentUser", username);
    window.location.href = "dashboard.html"; // Redirect to dashboard
  } else {
    error.textContent = "❌ Incorrect username or password.";
  }
}

// Handle register process
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
  window.location.href = "dashboard.html"; // Redirect to dashboard
}

// Auto-redirect to dashboard if already logged in
if (window.location.pathname.includes("login") || window.location.pathname.includes("auth")) {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    window.location.href = "dashboard.html";
  }
}