document.addEventListener("DOMContentLoaded", () => {
  const profilePic = document.querySelector(".profile-picture");
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.style.display = "none";

  // When profile picture is clicked, open file selector
  profilePic.addEventListener("click", () => fileInput.click());
  profilePic.addEventListener("keypress", e => {
    if (e.key === "Enter" || e.key === " ") fileInput.click();
  });

  // When a file is selected, preview it as profile picture
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      profilePic.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

  // Example: dynamically add posts
  const postsData = [
    {
      title: "Sharing some positive vibes",
      content: "Remember to breathe deeply and take a moment for yourself today. #selfcare"
    },
    {
      title: "New affirmation",
      content: `"I am enough as I am." Keep this close!`
    },
    {
      title: "Cystic Fibrosis Awareness",
      content: "Every day is a fight and a gift. Stay strong everyone!"
    }
  ];

  const postsContainer = document.querySelector(".profile-posts");
  postsContainer.innerHTML = ""; // Clear default posts

  postsData.forEach(post => {
    const article = document.createElement("article");
    article.className = "profile-post";
    article.tabIndex = 0;

    const h3 = document.createElement("h3");
    h3.textContent = post.title;

    const p = document.createElement("p");
    p.textContent = post.content;

    article.appendChild(h3);
    article.appendChild(p);
    postsContainer.appendChild(article);
  });
});