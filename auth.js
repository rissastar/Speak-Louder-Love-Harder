document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("auth-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;
      const msg = document.getElementById("auth-message");

      if (!username || !password) {
        msg.textContent = "All fields required.";
        return;
      }

      const users = JSON.parse(localStorage.getItem("users") || "{}");

      if (users[username]) {
        if (users[username] === password) {
          localStorage.setItem("currentUser", username);
          location.href = "dashboard.html";
        } else {
          msg.textContent = "Incorrect password ❌";
        }
      } else {
        users[username] = password;
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", username);
        location.href = "dashboard.html";
      }
    });
  }
});