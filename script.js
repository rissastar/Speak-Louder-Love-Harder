const feed = document.getElementById("feed");

const posts = [
  {
    user: "Larissa",
    avatar: "img/user.jpg",
    image: "img/post1.jpg",
    caption: "Speak louder. Love harder. 💕",
  },
  {
    user: "Alex",
    avatar: "img/user2.jpg",
    image: "img/post2.jpg",
    caption: "Mental health matters. #BreakTheStigma",
  }
];

function renderPost(post) {
  return `
    <div class="post">
      <div class="post-header">
        <img src="${post.avatar}" class="avatar" />
        <strong>@${post.user}</strong>
      </div>
      <img src="${post.image}" class="post-img" />
      <div class="post-actions">❤️ 💬 🔁 📎</div>
      <p class="post-caption">${post.caption}</p>
    </div>
  `;
}

feed.innerHTML = posts.map(renderPost).join("");

document.getElementById("createPost").addEventListener("click", () => {
  alert("Post composer coming soon!");
});

// Get elements
const createPostBtn = document.getElementById('createPost');
const postModal = document.getElementById('postModal');
const cancelPostBtn = document.getElementById('cancelPost');
const submitPostBtn = document.getElementById('submitPost');
const postText = document.getElementById('postText');
const feed = document.getElementById('feed');

// Open modal on + button click
createPostBtn.addEventListener('click', () => {
  postModal.style.display = 'flex';
  postText.value = '';
  postText.focus();
});

// Close modal on cancel
cancelPostBtn.addEventListener('click', () => {
  postModal.style.display = 'none';
});

// Close modal on outside click
window.addEventListener('click', (e) => {
  if (e.target === postModal) {
    postModal.style.display = 'none';
  }
});

// Submit post and add to feed
submitPostBtn.addEventListener('click', () => {
  const text = postText.value.trim();
  if (!text) {
    alert('Please write something before posting.');
    return;
  }
  
  // Create post element
  const postEl = document.createElement('div');
  postEl.className = 'post';
  postEl.innerHTML = `
    <div class="post-header">
      <img src="img/avatar.png" alt="User" class="avatar" />
      <div><strong>You</strong></div>
    </div>
    <div class="post-caption">${escapeHtml(text)}</div>
  `;
  
  feed.prepend(postEl);
  postModal.style.display = 'none';
});

// Helper to escape HTML to avoid injection
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}