const SUPABASE_URL = 'https://ytgrzhtntwzefwjmhgjj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    document.getElementById('loginBtn')?.remove();
    document.getElementById('registerBtn')?.remove();
    document.getElementById('logoutBtn').style.display = 'inline';
  }

  loadFeed();
});

async function submitPost() {
  const textarea = document.getElementById('postText');
  const topic = document.getElementById('postTopic').value;
  const imageInput = document.getElementById('postImage');
  const text = textarea.value;

  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return alert("Please log in to post.");

  let imageUrl = null;
  if (imageInput.files.length > 0) {
    const file = imageInput.files[0];
    const { data, error } = await supabase.storage.from('images').upload(`public/${Date.now()}-${file.name}`, file);
    if (error) return alert("Image upload failed.");
    imageUrl = `${SUPABASE_URL}/storage/v1/object/public/images/${data.path}`;
  }

  const { error } = await supabase.from('posts').insert({
    user_id: user.id,
    content: text,
    topic,
    image_url: imageUrl
  });

  if (error) {
    alert("Post failed.");
  } else {
    textarea.value = '';
    imageInput.value = '';
    loadFeed();
  }
}

async function loadFeed() {
  const { data: posts } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
  const feed = document.getElementById('feed');
  feed.innerHTML = '';

  posts.forEach(post => {
    const div = document.createElement('div');
    div.className = 'post';
    div.innerHTML = `
      <p><strong>Topic:</strong> ${post.topic}</p>
      <p>${post.content}</p>
      ${post.image_url ? `<img src="${post.image_url}" style="max-width: 100%;">` : ''}
      <p><small>${new Date(post.created_at).toLocaleString()}</small></p>
    `;
    feed.appendChild(div);
  });
}