// Elements
const createPostBtn = document.getElementById('createPost');
const postModal = document.getElementById('postModal');
const cancelPostBtn = document.getElementById('cancelPost');
const submitPostBtn = document.getElementById('submitPost');
const postText = document.getElementById('postText');
const postImage = document.getElementById('postImage');
const feed = document.getElementById('feed');

// Show modal
createPostBtn.addEventListener('click', () => {
  postModal.style.display = 'flex';
  postText.value = '';
  postImage.value = '';
  postText.focus();
});

// Hide modal - Cancel button
cancelPostBtn.addEventListener('click', () => {
  postModal.style.display = 'none';
});

// Hide modal - Click outside modal content
window.addEventListener('click', (e) => {
  if (e.target === postModal) {
    postModal.style.display = 'none';
  }
});

function submitPost() {
  const postText = document.getElementById("postText").value;
  const postImage = document.getElementById("postImage").files[0];
  const user = localStorage.getItem("loggedInUser");

  if (!user) {
    alert("You must be logged in to post.");
    return;
  }

  if (!postText && !postImage) {
    alert("Please write something or upload an image.");
    return;
  }

  const postElement = document.createElement("div");
  postElement.className = "post";

  const textParagraph = document.createElement("p");
  textParagraph.textContent = postText;
  postElement.appendChild(textParagraph);

  if (postImage) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      postElement.appendChild(img);

      savePost(user, postText, img.src);
    };
    reader.readAsDataURL(postImage);
  } else {
    savePost(user, postText, null);
  }

  document.getElementById("postsFeed").prepend(postElement);

  document.getElementById("postText").value = "";
  document.getElementById("postImage").value = "";
}

function savePost(user, text, image) {
  const key = "user_" + user;
  const userData = JSON.parse(localStorage.getItem(key));

  userData.posts.unshift({ text: text, image: image });
  localStorage.setItem(key, JSON.stringify(userData));
}

// Escape HTML helper
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Attach like and comment event listeners to a post element
function attachPostEventListeners(postEl) {
  const likeBtn = postEl.querySelector('.like-btn');
  const likeCountSpan = postEl.querySelector('.like-count');
  const commentBtn = postEl.querySelector('.comment-btn');
  const commentsSection = postEl.querySelector('.comments-section');

  let liked = false;
  let likeCount = 0;

  likeBtn.addEventListener('click', () => {
    liked = !liked;
    likeCount += liked ? 1 : -1;
    likeBtn.textContent = liked ? '❤️ Liked' : '♡ Like';
    likeCountSpan.textContent = likeCount;
  });

  commentBtn.addEventListener('click', () => {
    // Prevent multiple comment boxes open at once
    if (commentsSection.querySelector('textarea')) {
      return;
    }

    const commentBox = document.createElement('div');
    commentBox.innerHTML = `
      <textarea rows="2" placeholder="Write a comment..." style="width:100%; margin-top:10px;"></textarea>
      <button>Post Comment</button>
    `;

    commentsSection.appendChild(commentBox);

    const textarea = commentBox.querySelector('textarea');
    const postCommentBtn = commentBox.querySelector('button');

    postCommentBtn.addEventListener('click', () => {
      const commentText = textarea.value.trim();
      if (!commentText) {
        alert('Write a comment first');
        return;
      }

      const commentEl = document.createElement('div');
      commentEl.textContent = commentText;
      commentEl.style.padding = '6px 8px';
      commentEl.style.marginTop = '6px';
      commentEl.style.background = '#f1f1f1';
      commentEl.style.borderRadius = '8px';

      commentsSection.insertBefore(commentEl, commentBox);
      textarea.value = '';
    });
  });
}