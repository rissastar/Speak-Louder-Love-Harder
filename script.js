document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Thank you for reaching out! We will get back to you soon.');
  this.reset();
});
document.getElementById('storyForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Future: send data to backend/form service here

  document.getElementById('storyConfirmation').style.display = 'block';
  this.reset();
});