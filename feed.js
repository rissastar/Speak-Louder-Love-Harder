// feed.js
import { supabase } from './supabaseClient.js';
import { checkAuth } from './auth.js';
import { escapeHTML } from './utils.js';

export async function initFeedPage() {
  const session = await checkAuth();
  if (!session) return;

  const postBtn = document.getElementById('post-btn');
  const postText = document.getElementById('post-text');
  const postType = document.getElementById('post-type');
  const postCategory = document.getElementById('post-category');
  const postImageInput = document.getElementById('post-image');
  const postsContainer = document.getElementById('posts');

  async function fetchPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select(`*, users: user_id (username, email, avatar_url)`)
      .order('inserted_at', { ascending: false });

    if (error) return console.error(error);

    postsContainer.innerHTML = '';
    data.forEach(post => {
      const user = post.users || {};
      const avatar = user.avatar_url
        ? supabase.storage.from('avatars').getPublicUrl(user.avatar_url).publicUrl
        : 'default-avatar.png';
      const image = post.image_url
        ? supabase.storage.from('images').getPublicUrl(post.image_url).publicUrl
        : null;

      postsContainer.innerHTML += `
        <div class="post">
          <div class="post-header">
            <img src="${avatar}" class="avatar" />
            <strong>${user.username || user.email}</strong>
            <small>${post.category} • ${post.type}</small>
          </div>
          <p>${escapeHTML(post.text)}</p>
          ${image ? `<img src="${image}" class="post-image" />` : ''}
        </div>
      `;
    });
  }

  if (postBtn) {
    postBtn.addEventListener('click', async () => {
      const text = postText.value.trim();
      const type = postType.value;
      const category = postCategory.value;
      if (!text || !type || !category) return alert('Complete the form.');

      let image_url = null;
      if (postImageInput.files.length) {
        const file = postImageInput.files[0];
        const filename = `${session.user.id}_${Date.now()}.${file.name.split('.').pop()}`;
        const { data, error } = await supabase.storage.from('images').upload(filename, file);
        if (error) return alert('Image upload failed.');
        image_url = data.path;
      }

      const { error } = await supabase.from('posts').insert({
        user_id: session.user.id, text, type, category, image_url
      });

      if (error) return alert(error.message);

      postText.value = '';
      postImageInput.value = '';
      postType.value = '';
      postCategory.value = '';
      fetchPosts();
    });
  }

  supabase
    .channel('realtime:posts')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, fetchPosts)
    .subscribe();

  fetchPosts();
}