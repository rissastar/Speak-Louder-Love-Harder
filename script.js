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