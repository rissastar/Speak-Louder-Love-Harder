// ✅ 1. Initialize Supabase
const supabaseUrl = 'https://rbpjytmoqvwanqgbmhem.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJicGp5dG1vcXZ3YW5xZ2JtaGVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MDIyNDMsImV4cCI6MjA2NTE3ODI0M30.xEjcJfZA4iIs7R27KsX6SEiZiU2yD6R3AjHFpfhFnDQ';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// ✅ 2. Check if user is logged in on any protected page
async function checkSession() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (!user || error) {
    window.location.href = 'auth.html'; // redirect to login
  }
  return user;
}

// ✅ 3. Logout function
async function logout() {
  await supabase.auth.signOut();
  window.location.href = 'auth.html';
}

// ✅ 4. Login function
async function login(email, password, callback) {
  const { error, data } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data };
}

// ✅ 5. Signup function with profile creation
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