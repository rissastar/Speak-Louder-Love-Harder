import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Supabase setup
const supabaseUrl = 'https://ytgrzhtntwzefwjmhgjj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8'
const supabase = createClient(supabaseUrl, supabaseKey)

// Auto-redirect if not logged in
async function protectRoute() {
  const { data, error } = await supabase.auth.getSession()
  if (!data.session) {
    window.location.href = 'login.html'
  }
}

protectRoute()

// Load user profile info
async function loadProfile() {
  const {
    data: { user }
  } = await supabase.auth.getUser()

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profile) {
    document.getElementById('username').textContent = `@${profile.username || user.email.split('@')[0]}`
    document.getElementById('bio').textContent = profile.bio || 'No bio yet'
    document.getElementById('avatar').src = profile.avatar_url || 'https://via.placeholder.com/100'
  }
}

// Load user posts
async function loadPosts() {
  const {
    data: { user }
  } = await supabase.auth.getUser()

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const postContainer = document.getElementById('userPosts')
  postContainer.innerHTML = ''

  if (!posts || posts.length === 0) {
    postContainer.innerHTML = '<p style="text-align:center; color:gray;">No posts yet.</p>'
    return
  }

  posts.forEach(post => {
    const div = document.createElement('div')
    div.className = 'post'
    div.innerHTML = `
      <p>${post.content || ''}</p>
      ${post.image_url ? `<img src="${post.image_url}" alt="Post Image">` : ''}
    `
    postContainer.appendChild(div)
  })
}

// Toggle dropdown topic nav
document.getElementById('toggleTopics')?.addEventListener('click', () => {
  document.getElementById('topicList')?.classList.toggle('hidden')
})

// On load
loadProfile()
loadPosts()