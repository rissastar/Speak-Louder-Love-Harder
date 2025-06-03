// 1. Floating sparkles all over background
for (let i = 0; i < 30; i++) {
  const sparkle = document.createElement('div');
  sparkle.classList.add('sparkle');
  sparkle.style.left = `${Math.random() * 100}vw`;
  sparkle.style.top = `${Math.random() * 100}vh`;
  sparkle.style.width = sparkle.style.height = `${Math.random() * 15 + 5}px`;
  sparkle.style.animationDelay = `${Math.random() * 5}s`;
  document.body.appendChild(sparkle);
}

// 2. Button bounce animation on click
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.add('bounce');
    button.addEventListener('animationend', () => {
      button.classList.remove('bounce');
    }, { once: true });
  });
});

// 3. Sparkle bursts on card hover
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    for(let i=0; i<10; i++) {
      const sparkle = document.createElement('span');
      sparkle.className = 'sparkle-burst';
      sparkle.style.top = `${Math.random() * card.clientHeight}px`;
      sparkle.style.left = `${Math.random() * card.clientWidth}px`;
      card.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1000);
    }
  });
});

// 4. Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute('href'))?.scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// 5. Dark/light mode toggle (optional)
// Assumes you have a button with id 'theme-toggle' and CSS for [data-theme="dark"]
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      themeToggleBtn.textContent = '🌙 Dark Mode';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggleBtn.textContent = '☀️ Light Mode';
    }
  });
}