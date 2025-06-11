function signUp() {
  const username = document.getElementById('signupUsername').value;
  const password = document.getElementById('signupPassword').value;

  if (!username || !password) {
    alert('Please fill out both fields.');
    return;
  }

  // Store in localStorage (temporary, insecure)
  localStorage.setItem('user_' + username, password);
  alert('Account created! Please log in.');
  window.location.href = 'login.html';
}

function logIn() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  const storedPassword = localStorage.getItem('user_' + username);

  if (storedPassword === password) {
    localStorage.setItem('loggedInUser', username);
    alert('Login successful!');
    window.location.href = 'dashboard.html';
  } else {
    alert('Invalid username or password.');
  }
}