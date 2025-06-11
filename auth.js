// auth.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ytgrzhtntwzefwjmhgjj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Register user function
export async function register(email, password) {
  const { user, error } = await supabase.auth.signUp({ email, password })
  return { user, error }
}

// Login user function
export async function login(email, password) {
  const { user, error } = await supabase.auth.signIn({ email, password })
  return { user, error }
}

// Logout user function
export async function logout() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

// Get current user
export function getCurrentUser() {
  return supabase.auth.user()
}