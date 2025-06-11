const supabaseUrl = 'https://rbpjytmoqvwanqgbmhem.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJicGp5dG1vcXZ3YW5xZ2JtaGVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MDIyNDMsImV4cCI6MjA2NTE3ODI0M30.xEjcJfZA4iIs7R27KsX6SEiZiU2yD6R3AjHFpfhFnDQ';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Submit a new post
async function submitPost() {
  const textarea = document.getElementById('post-text');
  const content = textarea.value.trim();

  if (!content) {
    alert("Post cannot be empty!");
    return;
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    alert("You must be logged in to post.");
    return;
  }

  const { error } = await supabase.from('posts').insert({
    content,
    user_id: userData.user.id
  });

  if (error) {
    alert("Error posting: " + error.message);
  } else {
    textarea.value = '';
    loadPosts(); // refresh feed
  }
}

// Load all posts
async function loadPosts() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, content, created_at, user_id, profiles(username)')
    .order('created_at', { ascending: false });

  const postsDiv = document.getElementById('posts');
  postsDiv.innerHTML = '';

  if (error) {
    postsDiv.innerHTML = `<p>Error loading posts.</p>`;
    return;
  }

  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.className = 'post';
    postEl.innerHTML = `
      <strong>@${post.profiles?.username || 'Anonymous'}</strong>
      <p>${post.content}</p>
      <small>${new Date(post.created_at).toLocaleString()}</small>
    `;
    postsDiv.appendChild(postEl);
  });
}

// Load posts on page load
loadPosts();