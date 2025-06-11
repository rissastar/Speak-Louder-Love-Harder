// ✅ Supabase Initialization
const supabaseUrl = 'https://rbpjytmoqvwanqgbmhem.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJicGp5dG1vcXZ3YW5xZ2JtaGVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MDIyNDMsImV4cCI6MjA2NTE3ODI0M30.xEjcJfZA4iIs7R27KsX6SEiZiU2yD6R3AjHFpfhFnDQ';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// ✅ Check if user is logged in (for protected pages)
async function checkSession() {
  const { data, error } = await supabase.auth.getUser();
  if (!data?.user || error) {
    window.location.href = 'auth.html'; // redirect if not logged in
  }
  return data.user;
}

// ✅ Logout user
async function logout() {
  await supabase.auth.signOut();
  window.location.href = 'auth.html';
}

// ✅ Login function
async function login(email, password) {
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data };
}

// ✅ Signup function + profile creation
async function signup(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    return { success: false, message: error.message };
  }

  const user = data?.user;
  if (user) {
    await supabase.from('profiles').insert({
      id: user.id,
      username: email.split('@')[0],
      bio: '',
      avatar_url: ''
    });
  }

  return { success: true, data };
}