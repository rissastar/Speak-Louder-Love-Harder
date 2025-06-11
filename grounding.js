import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient(
  'https://ytgrzhtntwzefwjmhgjj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8'
)

async function submitGrounding() {
  const input = document.getElementById('groundingInput').value
  const { data: user } = await supabase.auth.getUser()
  if (!input || !user.user) return alert("You must be logged in and type something.")

  const { error } = await supabase.from('grounding').insert({
    text: input,
    user_id: user.user.id
  })
  if (!error) {
    document.getElementById('groundingInput').value = ''
    loadGrounding()
  }
}

async function loadGrounding() {
  const { data, error } = await supabase.from('grounding').select('*').order('created_at', { ascending: false })
  const feed = document.getElementById('groundingFeed')
  feed.innerHTML = ''
  data.forEach(g => {
    const li = document.createElement('li')
    li.textContent = g.text
    feed.appendChild(li)
  })
}

loadGrounding()
supabase.channel('realtime:grounding')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'grounding' }, loadGrounding)
  .subscribe()