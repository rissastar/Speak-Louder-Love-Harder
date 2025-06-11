import { supabase, signIn, signUp, signOut, getUser, onAuthStateChange } from './auth.js'

// UI Elements
const loginBtn = document.getElementById('login-btn')
const registerBtn = document.getElementById('register-btn')
const logoutBtn = document.getElementById('logout-btn')
const userInfo = document.getElementById('user-info')
const postForm = document.getElementById('post-form')
const postContent = document.getElementById('post-content')
const postTopic = document.getElementById('post-topic')
const postsContainer = document.getElementById('posts-container')

// Update UI based on auth state
async function updateUI() {
  const user = getUser()
  if (user) {
    loginBtn.style.display = 'none'
    registerBtn.style.display = 'none'
    logoutBtn.style.display = 'inline-block'
    userInfo.textContent = `Logged in as: ${user.email}`
    postForm.style.display = 'block'
    await loadPosts()
  } else {
    loginBtn.style.display = 'inline-block'
    registerBtn.style.display = 'inline-block'
    logoutBtn.style.display = 'none'
    userInfo.textContent = 'Not logged in'
    postForm.style.display = 'none'
    postsContainer.innerHTML = ''
  }
}

// Event Listeners
loginBtn.onclick = async () => {
  const email = prompt('Enter your email:')
  const password = prompt('Enter your password:')
  try {
    await signIn(email, password)
    alert('Logged in!')
    updateUI()
  } catch (e) {
    alert(e.message)
  }
}

registerBtn.onclick = async () => {
  const email = prompt('Enter your email:')
  const password = prompt('Enter your password:')
  const username = prompt('Enter your username:')
  try {
    await signUp(email, password, username)
    alert('Registered! Please check your email to confirm.')
    updateUI()
  } catch (e) {
    alert(e.message)
  }
}

logoutBtn.onclick = async () => {
  try {
    await signOut()
    alert('Logged out!')
    updateUI()
  } catch (e) {
    alert(e.message)
  }
}

postForm.onsubmit = async (e) => {
  e.preventDefault()
  const user = getUser()
  if (!user) {
    alert('Please log in to post.')
    return
  }
  const content = postContent.value.trim()
  const topic = postTopic.value
  if (!content) {
    alert('Post content cannot be empty.')
    return
  }
  try {
    const { error } = await supabase.from('posts').insert([{
      content,
      topic,
      user_id: user.id,
      created_at: new Date().toISOString()
    }])
    if (error) throw error
    postContent.value = ''
    await loadPosts()
  } catch (e) {
    alert(e.message)
  }
}

async function loadPosts() {
  const { data, error } = await supabase.from('posts').select(`
    *,
    profiles(username)
  `).order('created_at', { ascending: false })
  if (error) {
    alert(error.message)
    return
  }
  postsContainer.innerHTML = data.map(post => `
    <div class="post">
      <p><strong>${post.profiles?.username || 'Anonymous'}</strong> <em>(${post.topic})</em></p>
      <p>${post.content}</p>
      <p><small>${new Date(post.created_at).toLocaleString()}</small></p>
    </div>
  `).join('')
}

// Auth state listener
onAuthStateChange(() => {
  updateUI()
})

// Initial UI update
updateUI()