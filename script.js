// Panic modal open/close logic
const panicModal = document.getElementById('panicModal');
const openPanicBtn = document.getElementById('openPanicModal');
const closePanicBtn = document.getElementById('closePanicModal');
const exitButton = document.getElementById('exitButton');

openPanicBtn.addEventListener('click', () => {
  panicModal.classList.remove('hidden');
});

closePanicBtn.addEventListener('click', () => {
  panicModal.classList.add('hidden');
});

exitButton.addEventListener('click', () => {
  // Redirect user quietly to a neutral site
  window.location.href = 'https://www.google.com';
});

// Register the service worker for PWA offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('Service Worker registered.', reg))
      .catch(err => console.log('Service Worker registration failed:', err));
  });
}