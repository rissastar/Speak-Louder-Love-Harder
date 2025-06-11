// feed.js

// Initialize Supabase client
const SUPABASE_URL = "https://ytgrzhtntwzefwjmhgjj.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const postFeed = document.getElementById("post-feed");
const postContent = document.getElementById("post-content");
const postImageInput = document.getElementById("post-image");

let currentUser = null;

async function checkUser() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    window.location.href = "login.html";
  } else {
    currentUser = user;
    loadPosts();
    setupRealtime();
  }
}

// Load all posts ordered by newest first
async function loadPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select(`*, profiles(username, avatar_url)`)
    .order("created_at", { ascending: false });
  
  if (error) {
    console.error("Error loading posts:", error);
    return;
  }

  renderPosts(data);
}

function renderPosts(posts) {
  postFeed.innerHTML = "";
  if (!posts.length) {
    postFeed.innerHTML = `<p class="no-posts">No posts yet. Be the first!</p>`;
    return;
  }

  posts.forEach(post => {
    const postEl = document.createElement("article");
    postEl.className = "post";

    // Post author info
    const avatarUrl = post.profiles?.avatar_url || "default-avatar.png";
    const username = post.profiles?.username || "Anonymous";

    // Format date
    const date = new Date(post.created_at);
    const dateStr = date.toLocaleString();

    postEl.innerHTML = `
      <header>
        <img src="${avatarUrl}" alt="${username}'s avatar" class="avatar" />
        <div>
          <strong>${username}</strong>
          <time datetime="${post.created_at}">${dateStr}</time>
        </div>
      </header>

      <p class="content">${escapeHtml(post.content)}</p>

      ${post.image_url ? `<img src="${post.image_url}" alt="Post image" class="post-image" />` : ""}

      <footer>
        <button class="like-btn" data-id="${post.id}">
          ❤️ <span class="like-count">${post.like_count || 0}</span>
        </button>
        <button class="comment-btn" data-id="${post.id}">💬 Comment</button>
        <div class="comments-section" id="comments-${post.id}" style="display:none;">
          <!-- Comments will load here -->
          <textarea placeholder="Write a comment..." class="comment-input" data-post-id="${post.id}"></textarea>
          <button class="submit-comment-btn" data-post-id="${post.id}">Post Comment</button>
          <div class="comments-list" id="comments-list-${post.id}"></div>
        </div>
      </footer>
    `;

    postFeed.appendChild(postEl);
  });

  attachPostListeners();
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Attach event listeners for like and comment buttons
function attachPostListeners() {
  const likeButtons = document.querySelectorAll(".like-btn");
  likeButtons.forEach(btn => {
    btn.addEventListener("click", async e => {
      const postId = e.currentTarget.dataset.id;
      await toggleLike(postId);
    });
  });

  const commentButtons = document.querySelectorAll(".comment-btn");
  commentButtons.forEach(btn => {
    btn.addEventListener("click", e => {
      const postId = e.currentTarget.dataset.id;
      const commentsSection = document.getElementById(`comments-${postId}`);
      commentsSection.style.display = commentsSection.style.display === "none" ? "block" : "none";
      if (commentsSection.style.display === "block") {
        loadComments(postId);
      }
    });
  });

  const submitCommentButtons = document.querySelectorAll(".submit-comment-btn");
  submitCommentButtons.forEach(btn => {
    btn.addEventListener("click", async e => {
      const postId = e.currentTarget.dataset.postId;
      const input = document.querySelector(`.comment-input[data-post-id="${postId}"]`);
      const commentText = input.value.trim();
      if (commentText) {
        await submitComment(postId, commentText);
        input.value = "";
        loadComments(postId);
      }
    });
  });
}

async function toggleLike(postId) {
  // Simplified: For demo, just increment like_count
  // You can improve to toggle per user with likes table if desired
  const { data: post, error } = await supabase
    .from("posts")
    .select("like_count")
    .eq("id", postId)
    .single();

  if (error) {
    console.error("Error fetching post:", error);
    return;
  }

  const newCount = (post.like_count || 0) + 1;

  const { error: updateError } = await supabase
    .from("posts")
    .update({ like_count: newCount })
    .eq("id", postId);

  if (updateError) {
    console.error("Error updating like count:", updateError);
  } else {
    loadPosts(); // Refresh posts
  }
}

async function loadComments(postId) {
  const { data, error } = await supabase
    .from("comments")
    .select(`*, profiles(username, avatar_url)`)
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  const commentsList = document.getElementById(`comments-list-${postId}`);
  if (error) {
    commentsList.innerHTML = "<p>Error loading comments</p>";
    return;
  }

  if (!data.length) {
    commentsList.innerHTML = "<p>No comments yet</p>";
    return;
  }

  commentsList.innerHTML = data.map(comment => {
    const avatarUrl = comment.profiles?.avatar_url || "default-avatar.png";
    const username = comment.profiles?.username || "Anonymous";
    const date = new Date(comment.created_at);
    const dateStr = date.toLocaleString();

    return `
      <div class="comment">
        <img src="${avatarUrl}" alt="${username}'s avatar" class="avatar" />
        <div>
          <strong>${username}</strong> <time datetime="${comment.created_at}">${dateStr}</time>
          <p>${escapeHtml(comment.content)}</p>
        </div>
      </div>
    `;
  }).join("");
}

async function submitComment(postId, content) {
  const { error } = await supabase.from("comments").insert({
    post_id: postId,
    user_id: currentUser.id,
    content,
  });

  if (error) {
    alert("Failed to post comment.");
    console.error(error);
  }
}

async function submitPost() {
  const content = postContent.value.trim();
  if (!content && !postImageInput.files.length) {
    alert("Please enter text or select an image.");
    return;
  }

  let imageUrl = null;
  if (postImageInput.files.length) {
    const file = postImageInput.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${currentUser.id}-${Date.now()}.${fileExt}`;
    const filePath = `posts/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("posts")
      .upload(filePath, file);

    if (uploadError) {
      alert("Image upload failed.");
      console.error(uploadError);
      return;
    }

    const { data } = supabase.storage.from("posts").getPublicUrl(filePath);
    imageUrl = data.publicUrl;
  }

  const { error } = await supabase.from("posts").insert({
    user_id: currentUser.id,
    content,
    image_url: imageUrl,
  });

  if (error) {
    alert("Failed to post.");
    console.error(error);
  } else {
    postContent.value = "";
    postImageInput.value = "";
    loadPosts();
  }
}

function toggleTopics() {
  const dropdown = document.getElementById("topicDropdown");
  dropdown.classList.toggle("hidden");
}

function logout() {
  supabase.auth.signOut().then(() => {
    window.location.href = "login.html";
  });
}

// Initial setup
checkUser();