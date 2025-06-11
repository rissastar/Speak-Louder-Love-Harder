import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

export const supabase = createClient(
  'https://rbpjytmoqvwanqgbmhem.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJicGp5dG1vcXZ3YW5xZ2JtaGVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MDIyNDMsImV4cCI6MjA2NTE3ODI0M30.xEjcJfZA4iIs7R27KsX6SEiZiU2yD6R3AjHFpfhFnDQ'
);

const authButtons = document.getElementById('auth-buttons');

supabase.auth.getSession().then(({ data }) => {
  if (data.session) {
    authButtons.innerHTML = '<button onclick="logout()">Logout</button>';
  } else {
    authButtons.innerHTML = '<a href="login.html">Login / Register</a>';
  }
});

window.logout = async function () {
  await supabase.auth.signOut();
  location.reload();
};