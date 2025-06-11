// Mark which posts the current user has liked
async function markLikesForPosts(postsArray) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || postsArray.length === 0) return;

  const postIds = postsArray.map(p => p.id);
  const { data: likes, error } = await supabase
    .from('likes')
    .select('post_id')
    .eq('user_id', user.id)
    .in('post_id', postIds);

  if (error) {
    console.error('Error fetching likes:', error);
    return;
  }

  const likedPostIds = likes.map(like => like.post_id);
  postsArray.forEach(post => {
    post.likedByCurrentUser = likedPostIds.includes(post.id);
  });
}

// Submit new post
postForm.addEventListener('submit', async e => {
  e.preventDefault();

  const content = postContent.value.trim();
  const file = postImageInput.files[0];

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    alert('You must be logged in to post.');
    return;
  }

  let image_url = null;

  if (file) {
    const filePath = `posts/${user.id}_${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) {
      alert('Image upload failed.');
      return;
    }

    const { data: imageData } = supabase.storage.from('images').getPublicUrl(filePath);
    image_url = imageData.publicUrl;
  }

  const { error: insertError } = await supabase.from('posts').insert({
    user_id: user.id,
    content,
    image_url
  });

  if (insertError) {
    alert('Failed to create post.');
    return;
  }

  postContent.value = '';
  postImageInput.value = '';
  imagePreview.classList.add('hidden');
  imagePreview.src = '';

  await loadInitialPosts();
});

// Like/unlike posts
postsList.addEventListener('click', async e => {
  if (!e.target.classList.contains('like-btn')) return;

  const postEl = e.target.closest('.post');
  const postId = postEl.getAttribute('data-post-id');

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    alert('You must be logged in to like posts.');
    return;
  }

  const isLiked = e.target.classList.contains('liked');

  if (isLiked) {
    await supabase.from('likes').delete().match({
      post_id: postId,
      user_id: user.id
    });
  } else {
    await supabase.from('likes').insert({
      post_id: postId,
      user_id: user.id
    });
  }

  await loadInitialPosts();
});

// Toggle comment form
postsList.addEventListener('click', e => {
  if (!e.target.classList.contains('comment-btn')) return;

  const postEl = e.target.closest('.post');
  const form = postEl.querySelector('.comment-form');
  form.classList.toggle('hidden');
});

// Submit comment
postsList.addEventListener('submit', async e => {
  if (!e.target.classList.contains('comment-form')) return;
  e.preventDefault();

  const input = e.target.querySelector('.comment-input');
  const content = input.value.trim();
  if (!content) return;

  const postEl = e.target.closest('.post');
  const postId = postEl.getAttribute('data-post-id');

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    alert('You must be logged in to comment.');
    return;
  }

  const { error } = await supabase.from('comments').insert({
    post_id: postId,
    user_id: user.id,
    content
  });

  if (error) {
    alert('Failed to post comment.');
    return;
  }

  input.value = '';
  await loadInitialPosts();
});

// Load more posts on button click
loadMoreBtn.addEventListener('click', async () => {
  const morePosts = await fetchPosts(lastPostId);
  await markLikesForPosts(morePosts);
  renderPosts(morePosts, true);

  if (morePosts.length < POSTS_PER_PAGE) {
    loadMoreBtn.style.display = 'none';
  } else {
    lastPostId = morePosts[morePosts.length - 1].created_at;
  }
});

// Auto-initialize feed
document.addEventListener('DOMContentLoaded', loadInitialPosts);