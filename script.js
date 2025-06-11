// main.js
import { supabase, register, login, logout, getCurrentUser } from './auth.js'

const loginBtn = document.getElementById('login-btn')
const registerBtn = document.getElementById('register-btn')
const logoutBtn = document.getElementById('logout-btn')
const userInfo = document.getElementById('user-info')
const postForm = document.getElementById('post-form')

function updateUI() {
  const user = getCurrentUser()
  if (user) {
    userInfo.textContent = `Logged in as: ${user.email}`
    loginBtn.style.display = 'none'
    registerBtn.style.display = 'none'
    logoutBtn.style.display = 'inline-block'
    postForm.style.display = 'flex'
  } else {
    userInfo.textContent = 'Not logged in'
    loginBtn.style.display = 'inline-block'
    registerBtn.style.display = 'inline-block'
    logoutBtn.style.display = 'none'
    postForm.style.display = 'none'
  }
}

loginBtn.addEventListener('click', async () => {
  const email = prompt('Enter your email:')
  const password = prompt('Enter your password:')
  if (!email || !password) {
    alert('Email and password are required!')
    return
  }
  const { user, error } = await login(email, password)
  if (error) {
    alert(`Login error: ${error.message}`)
  } else {
    alert('Logged in successfully!')
    updateUI()
  }
})

registerBtn.addEventListener('click', async () => {
  const email = prompt('Enter your email:')
  const password = prompt('Enter your password (min 6 chars):')
  if (!email || !password) {
    alert('Email and password are required!')
    return
  }
  const { user, error } = await register(email, password)
  if (error) {
    alert(`Registration error: ${error.message}`)
  } else {
    alert('Registration successful! Please check your email to confirm.')
  }
})

logoutBtn.addEventListener('click', async () => {
  const { error } = await logout()
  if (error) {
    alert(`Logout error: ${error.message}`)
  } else {
    alert('Logged out successfully!')
    updateUI()
  }
})

// On page load, check if user is logged in
window.addEventListener('load', () => {
  updateUI()
})

// Post submission
if (postForm) {
  postForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const user = getCurrentUser()
    if (!user) {
      alert('You must be logged in to post.')
      return
    }
    const content = document.getElementById('post-content').value.trim()
    const page = document.getElementById('post-page').value // dropdown select for page, you add this to your form
    if (!content) {
      alert('Post content cannot be empty.')
      return
    }
    const { error } = await supabase
      .from('posts')
      .insert([{ user_id: user.id, content, page }])
    if (error) {
      alert('Error posting: ' + error.message)
    } else {
      alert('Post created!')
      postForm.reset()
      // Refresh posts list (you implement)
      loadPosts()
    }
  })
}

// Example function to load posts from Supabase and render them
async function loadPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) {
    console.error(error)
    return
  }
  const postsContainer = document.getElementById('posts-container')
  if (!postsContainer) return
  postsContainer.innerHTML = ''
  data.forEach(post => {
    const postEl = document.createElement('div')
    postEl.className = 'post'
    postEl.innerHTML = `
      <p>${post.content}</p>
      <small>Posted on ${new Date(post.created_at).toLocaleString()}</small>
    `
    postsContainer.appendChild(postEl)
  })
}

window.addEventListener('load', () => {
  loadPosts()
})