import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ytgrzhtntwzefwjmhgjj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8'

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function signUp(email, password, username) {
  const { user, error } = await supabase.auth.signUp({ email, password })
  if (error) throw error
  if (user) {
    // Create profile
    const { error: profileError } = await supabase.from('profiles').insert([{ id: user.id, username }])
    if (profileError) throw profileError
  }
  return user
}

export async function signIn(email, password) {
  const { user, error } = await supabase.auth.signIn({ email, password })
  if (error) throw error
  return user
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export function getUser() {
  return supabase.auth.user()
}

export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session)
  })
}