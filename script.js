import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Use your actual Supabase URL and anon key
const SUPABASE_URL = 'https://ytgrzhtntwzefwjmhgjj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3p...'

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
let postsSubscription = null

// Escape HTML helper
function escapeHtml(text) {
  if (!text) return ''
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Check auth and update UI
async function checkUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) {
    console.error('Error getting user:', error.message)
    currentUser = null
    showLoggedOutState()
    unsubscribePosts()
    return
  }

  currentUser = user
  if (user) {
    showLoggedInState()
    listenToPosts()
  } else {
    showLoggedOutState()
    unsubscribePosts()
  }
}

function showLoggedInState() {
  if (loginBtn) loginBtn.style.display = 'none'
  if (registerBtn) registerBtn.style.display = 'none'
  if (logoutBtn) logoutBtn.style.display = 'inline-block'
  if (postComposer) postComposer.style.display = 'block'
}

function showLoggedOutState() {
  if (loginBtn) loginBtn.style.display = 'inline-block'
  if (registerBtn) registerBtn.style.display = 'inline-block'
  if (logoutBtn) logoutBtn.style.display = 'none'
  if (postComposer) postComposer.style.display = 'none'
  if (postsContainer) postsContainer.innerHTML = ''
}

if (loginBtn) {
  loginBtn.onclick = async () => {
    const email = prompt('Enter your email:')
    const password = prompt('Enter your password:')
    if (!email || !password) return alert('Email and password required.')

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    else {
      alert('Logged in successfully!')
      await checkUser()
    }
  }
}

if (registerBtn) {
  registerBtn.onclick = async () => {
    const email = prompt('Enter your email:')
    const password = prompt('Enter your password:')
    if (!email || !password) return alert('Email and password required.')

    const { error } = await supabase.auth.signUp({ email, password })
    if (error) alert(error.message)
    else {
      alert('Registration successful! Please check your email to confirm.')
      await checkUser()
    }
  }
}

if (logoutBtn) {
  logoutBtn.onclick = async () => {
    await supabase.auth.signOut()
    alert('Logged out.')
    await checkUser()
  }
}

// Upload image to Supabase storage bucket 'public'
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

  const { data } = supabase.storage.from('public').getPublicUrl(filePath)
  return data.publicUrl
}

if (postForm) {
  postForm.onsubmit = async (e) => {
    e.preventDefault()
    if (!currentUser) {
      alert('You must be logged in to post.')
      return
    }

    const content = document.getElementById('post-content')?.value.trim() || ''
    const category = document.getElementById('post-category')?.value
    const type = document.getElementById('post-type')?.value
    const imageFile = document.getElementById('post-image')?.files[0]

    if (!content || !category || !type) {
      alert('Please fill all fields.')
      return
    }

    let image_url = null
    if (imageFile) {
      image_url = await uploadImage(imageFile)
      if (!image_url) return // stop if upload failed
    }

    const { error } = await supabase.from('posts').insert([
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
}

// Load posts with user info
async function loadPosts() {
  if (!postsContainer) return

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

function createPostElement(post) {
  const postDiv = document.createElement('div')
  postDiv.classList.add('post')

  const user = post.user || { username: 'Unknown', avatar_url: null }

  postDiv.innerHTML = `
    <div class="post-header">
      <img class="avatar" src="${user.avatar_url || 'https://via.placeholder.com/40?text=👤'}" alt="${escapeHtml(user.username)}'s avatar" />
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

// Subscribe to realtime changes on posts table
function listenToPosts() {
  // Unsubscribe if existing
  unsubscribePosts()

  loadPosts()

  postsSubscription = supabase
    .channel('public:posts')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'posts' },
      (payload) => {
        console.log('Realtime posts change:', payload)
        loadPosts()
      }
    )
    .subscribe()
}

// Unsubscribe realtime posts listener
function unsubscribePosts() {
  if (postsSubscription) {
    supabase.removeChannel(postsSubscription)
    postsSubscription = null
  }
}

// Listen for auth changes globally
supabase.auth.onAuthStateChange(async (event, session) => {
  console.log('Auth state changed:', event)
  await checkUser()
})

// Initial check on page load
checkUser()