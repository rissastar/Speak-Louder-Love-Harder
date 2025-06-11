import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ytgrzhtntwzefwjmhgjj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8'

export const supabase = createClient(supabaseUrl, supabaseKey)

// ------------- Auth -----------------
async function login(email, pw) {
  return await supabase.auth.signInWithPassword({ email, password: pw })
}

async function register(email, pw) {
  return await supabase.auth.signUp({ email, password: pw })
}

async function logout() {
  await supabase.auth.signOut()
  window.location.href = 'logout.html'
}

async function getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// ------------- Profile ---------------
async function loadProfile() {
  const user = await getUser()
  if (!user) return window.location.href = 'login.html'
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
  if (data) {
    document.getElementById('profile-username').value = data.username
    document.getElementById('profile-bio').value = data.bio
    if (data.avatar_url) document.getElementById('avatar-preview').src = data.avatar_url
  }
}

async function saveProfile() {
  const user = await getUser()
  if (!user) return
  const username = document.getElementById('profile-username').value
  const bio = document.getElementById('profile-bio').value
  const file = document.getElementById('profile-avatar').files[0]
  let avatar_url = null

  if (file) {
    const ext = file.name.split('.').pop()
    const filePath = `${user.id}.${ext}`
    await supabase.storage.from('avatars').upload(filePath, file, { upsert: true })
    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
    avatar_url = data.publicUrl
  }

  await supabase.from('profiles').upsert({ id: user.id, username, bio, avatar_url })
  document.getElementById('profile-status').textContent = 'Profile saved!'
}

// ------------- Posts ------------------
async function showComposer() {
  const user = await getUser()
  const composer = document.getElementById('post-composer')
  if (!composer) return
  if (!user) {
    composer.innerHTML = '<p>Please <a href="login.html">login</a> to post.</p>'
    return
  }
  composer.innerHTML = `
    <div class="composer auth-form">
      <h3>Create Post</h3>
      <select id="post-topic"><option disabled selected>Select topic</option>
        <option>Mental Health</option><option>Addiction</option><option>Cystic Fibrosis</option>
        <option>Cirrhosis</option><option>Physical Abuse</option><option>Mental Abuse</option>
        <option>Sexual Abuse</option><option>Pitbull Love</option><option>Foster Children</option>
      </select>
      <textarea id="post-content" placeholder="Write something..."></textarea>
      <button id="post-submit">Post</button>
      <p id="post-status"></p>
    </div>`
  document.getElementById('post-submit').onclick = submitPost
}

async function submitPost() {
  const user = await getUser()
  const topic = document.getElementById('post-topic').value
  const content = document.getElementById('post-content').value
  if (!user || !topic || !content) return alert('All fields are required')
  await supabase.from('posts').insert([{ user_id: user.id, topic, content }])
  document.getElementById('post-content').value = ''
  loadPosts()
}

async function loadPosts() {
  const container = document.getElementById('posts-feed')
  container.innerHTML = '<h2>Loading...</h2>'
  const { data } = await supabase.from('posts')
    .select('id, content, topic, created_at, profiles(username)')
    .order('created_at', { ascending: false })
  if (!data || data.length === 0) {
    container.innerHTML = '<p>No posts yet.</p>'
    return
  }
  container.innerHTML = data.map(p => `
    <div class="post">
      <p><strong>${p.profiles?.username || 'Anon'}</strong> in <em>${p.topic}</em></p>
      <p>${p.content}</p>
      <small>${new Date(p.created_at).toLocaleString()}</small>
    </div>`).join('')
}

async function setupPage() {
  const user = await getUser()
  const authBtns = document.getElementById('auth-buttons')
  const ui = document.getElementById('user-info')
  if (user) {
    authBtns.innerHTML = '<button onclick="logout()">Logout</button>'
    ui.innerHTML = `Hello, <strong>${user.email}</strong>`
  } else {
    authBtns.innerHTML = '<a href="login.html">Login</a> | <a href="register.html">Register</a>'
  }

  showComposer()
  loadPosts()
}

// ------------- Entry ---------------
document.addEventListener('DOMContentLoaded', setupPage)

export { supabase, login, register, logout, getUser, loadProfile, saveProfile }