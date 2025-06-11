import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Use your actual Supabase URL and anon key (choose the correct one for your project)
const SUPABASE_URL = 'https://ytgrzhtntwzefwjmhgjj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// --- Elements ---
const loginBtn = document.getElementById('login-btn')
const registerBtn = document.getElementById('register-btn')
const logoutBtn = document.getElementById('logout-btn')
const authButtonsDiv = document.getElementById('auth-buttons')
const postComposer = document.getElementById('post-composer')
const postForm = document.getElementById('post-form')
const postsContainer = document.getElementById('posts-container')

let currentUser = null

// --- Utility: Escape HTML ---
function escapeHtml(text) {
  if (!text) return ''
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// --- Check user auth state and update UI ---
async function checkUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) {
    console.error('Error getting user:', error.message)
    currentUser = null
    showLoggedOutState()
    return
  }

  currentUser = user
  if (user) {
    showLoggedInState()
    listenToPosts()
  } else {
    showLoggedOutState()
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

// --- Login Handler ---
if (loginBtn) {
  loginBtn.onclick = async () => {
    const email = prompt('Enter your email:')
    const password = prompt('Enter your password:')
    if (!email || !password) return alert('Email and password required.')

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    else {
      alert('Logged in successfully!')
      checkUser()
    }
  }
}

// --- Register Handler ---
if (registerBtn) {
  registerBtn.onclick = async () => {
    const email = prompt('Enter your email:')
    const password = prompt('Enter your password:')
    if (!email || !password) return alert('Email and password required.')

    const { error } = await supabase.auth.signUp({ email, password })
    if (error) alert(error.message)
    else {
      alert('Registration successful! Please check your email to confirm.')
      checkUser()
    }
  }
}

// --- Logout Handler ---
if (logoutBtn) {
  logoutBtn.onclick = async () => {
    await supabase.auth.signOut()
    alert('Logged out.')
    checkUser()
  }
}

// --- Upload image ---
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

// --- Submit new post ---
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

// --- Load posts ---
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

// --- Listen to real-time post changes ---
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

// --- Load profile page ---
async function loadMyProfile() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    window.location.href = 'login.html'
    return
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('username, bio, avatar_url')
    .eq('id', user.id)
    .single()

  if (error) {
    console.error('Error loading profile:', error.message)
    return
  }

  document.querySelector('.profile-username').textContent = data.username || 'Your Username'
  const bioField = document.getElementById('bio')
  if (bioField) bioField.value = data.bio || ''

  if (data.avatar_url) {
    const avatarElem = document.querySelector('.profile-avatar')
    if (avatarElem) avatarElem.src = data.avatar_url
  }
}

if (window.location.pathname.endsWith('profile.html')) {
  supabase.auth.getUser().then(({ data }) => {
    if (!data.user) window.location.href = 'login.html'
    else loadMyProfile()
  })

  const saveBtn = document.getElementById('save-profile-btn')
  if (saveBtn) {
    saveBtn.addEventListener('click', async () => {
      const bio = document.getElementById('bio')?.value.trim() || ''
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase
        .from('profiles')
        .update({ bio })
        .eq('id', user.id)

      if (error) alert('Failed to update profile: ' + error.message)
      else alert('Profile updated!')
    })
  }
}

// --- Load public profile ---
async function loadPublicProfile() {
  const urlParams = new URLSearchParams(window.location.search)
  const userId = urlParams.get('id')
  if (!userId) {
    alert('No user specified')
    return
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('username, bio, avatar_url')
    .eq('id', userId)
    .single()

  if (error) {
    alert('User not found')
    return
  }

  document.querySelector('.profile-username').textContent = data.username || 'Username'
  document.querySelector('.profile-bio').textContent = data.bio || 'This user has no bio.'
  if (data.avatar_url) {
    const avatarElem = document.querySelector('.profile-avatar')
    if (avatarElem) avatarElem.src = data.avatar_url
  }
}

if (window.location.pathname.endsWith('public-profile.html')) {
  loadPublicProfile()
}

// --- Auth state change listener ---
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth event:', event)
  checkUser()
})

// --- Initialize ---
checkUser()