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