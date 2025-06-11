// script.js

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://ytgrzhtntwzefwjmhgjj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Elements
const loginBtn = document.getElementById('login-btn')
const registerBtn = document.getElementById('register-btn')
const logoutBtn = document.getElementById('logout-btn')

const authButtonsDiv = document.getElementById('auth-buttons')
const postComposer = document.getElementById('post-composer')
const postForm = document.getElementById('post-form')
const postsContainer = document.getElementById('posts-container')

let currentUser = null

// Show/hide buttons based on auth state
async function checkUser() {
  const { data: { user } } = await supabase.auth.getUser()
  currentUser = user

  if (user) {
    loginBtn.style.display = 'none'
    registerBtn.style.display = 'none'
    logoutBtn.style.display = 'inline-block'
    postComposer.style.display = 'block'
    listenToPosts()
  } else {
    loginBtn.style.display = 'inline-block'
    registerBtn.style.display = 'inline-block'
    logoutBtn.style.display = 'none'
    postComposer.style.display = 'none'
    postsContainer.innerHTML = ''
  }
}
checkUser()

// Login event
loginBtn.onclick = () => {
  const email = prompt('Enter your email:')
  const password = prompt('Enter your password:')
  if (!email || !password) return alert('Email and password required.')
  supabase.auth.signInWithPassword({ email, password })
    .then(({ error }) => {
      if (error) alert(error.message)
      else alert('Logged in successfully!')
      checkUser()
    })
}

// Register event
registerBtn.onclick = () => {
  const email = prompt('Enter your email:')
  const password = prompt('Enter your password:')
  if (!email || !password) return alert('Email and password required.')
  supabase.auth.signUp({ email, password })
    .then(({ error }) => {
      if (error) alert(error.message)
      else alert('Registration successful! Please check your email to confirm.')
      checkUser()
    })
}

// Logout event
logoutBtn.onclick = async () => {
  await supabase.auth.signOut()
  alert('Logged out.')
  checkUser()
}

// Upload image to Supabase Storage public/images folder
async function uploadImage(file) {
  if (!file) return null
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}.${fileExt}`
  const filePath = `images/${fileName}`

  const { error } = await supabase.storage.from('public').upload(filePath, file)
  if (error) {
    alert('Image upload failed: ' + error.message)
    return null
  }

  // Return public URL
  const { publicURL } = supabase.storage.from('public').getPublicUrl(filePath)
  return publicURL
}

// Handle new post submission
postForm.onsubmit = async (e) => {
  e.preventDefault()
  if (!currentUser) {
    alert('You must be logged in to post.')
    return
  }

  const content = document.getElementById('post-content').value.trim()
  const category = document.getElementById('post-category').value
  const type = document.getElementById('post-type').value
  const imageFile = document.getElementById('post-image').files[0]

  if (!content || !category || !type) {
    alert('Please fill all fields.')
    return
  }

  let image_url = null
  if (imageFile) {
    image_url = await uploadImage(imageFile)
  }

  const { data, error } = await supabase.from('posts').insert([
    {
      user_id: currentUser.id,
      content,
      category,
      type,
      image_url,
    },
  ])

  if (error) {
    alert('Error creating post: ' + error.message)
  } else {
    postForm.reset()
    alert('Post created!')
  }
}

// Render posts from DB
async function loadPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select(`*, user:profiles!posts_user_id_fkey(username, avatar_url)`)
    .order('created_at', { ascending: false })

  if (error) {
    postsContainer.innerHTML = '<p>Error loading posts.</p>'
    return
  }

  postsContainer.innerHTML = ''
  data.forEach(post => {
    postsContainer.appendChild(createPostElement(post))
  })
}

// Create a single post DOM element
function createPostElement(post) {
  const postDiv = document.createElement('div')
  postDiv.classList.add('post')

  const user = post.user || { username: 'Unknown', avatar_url: null }

  postDiv.innerHTML = `
    <div class="post-header">
      <img class="avatar" src="${user.avatar_url || 'https://via.placeholder.com/40?text=👤'}" alt="${user.username}'s avatar" />
      <span class="username">${escapeHtml(user.username)}</span>
    </div>
    <div class="post-meta">
      <strong>Category:</strong> ${escapeHtml(post.category)} | <strong>Type:</strong> ${escapeHtml(post.type)}<br/>
      <small>${new Date(post.created_at).toLocaleString()}</small>
    </div>
    <div class="post-content">${escapeHtml(post.content)}</div>
    ${post.image_url ? `<img class="post-image" src="${post.image_url}" alt="Post image" />` : ''}
  `

  return postDiv
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  if (!text) return ''
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Listen to real-time changes on posts table and update feed live
function listenToPosts() {
  loadPosts()
  supabase
    .channel('public:posts')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'posts' },
      (payload) => {
        console.log('Change received!', payload)
        loadPosts()
      }
    )
    .subscribe()
}