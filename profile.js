import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient(
  'https://ytgrzhtntwzefwjmhgjj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8'
)

async function protectRoute() {
  const { data } = await supabase.auth.getSession()
  if (!data.session) window.location.href = 'login.html'
}
protectRoute()

async function loadProfile() {
  const { data: { user } } = await supabase.auth.getUser()
  const { data: p } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  if (p) {
    document.getElementById('username').textContent = `@${p.username}`
    document.getElementById('bio').textContent = p.bio || ''
    document.getElementById('avatar').src = p.avatar_url || 'https://via.placeholder.com/100'
  }
}

async function loadPosts() {
  const { data: { user } } = await supabase.auth.getUser()
  const { data: posts = [] } = await supabase
    .from('posts').select('*').eq('user_id', user.id).order('created_at', { ascending: false })

  const c = document.getElementById('userPosts')
  c.innerHTML = ''
  if (!posts.length) {
    c.innerHTML = '<p style="text-align:center;color:#888;">No posts yet.</p>'
    return
  }
  posts.forEach(p => {
    const div = document.createElement('div'); div.className = 'post'
    div.innerHTML = `<p>${p.content}</p>${p.image_url ? `<img src="${p.image_url}" />` : ''}`
    c.appendChild(div)
  })
}

loadProfile(); loadPosts()