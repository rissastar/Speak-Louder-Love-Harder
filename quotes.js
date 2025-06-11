import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient(
  'https://ytgrzhtntwzefwjmhgjj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8'
)

async function submitQuote() {
  const quote = document.getElementById('quoteInput').value
  const { data: user } = await supabase.auth.getUser()
  if (!quote || !user.user) return alert("You must be logged in and type something.")

  const { error } = await supabase.from('quotes').insert({
    text: quote,
    user_id: user.user.id
  })
  if (!error) {
    document.getElementById('quoteInput').value = ''
    loadQuotes()
  }
}

async function loadQuotes() {
  const { data, error } = await supabase.from('quotes').select('*').order('created_at', { ascending: false })
  const feed = document.getElementById('quoteFeed')
  feed.innerHTML = ''
  data.forEach(q => {
    const li = document.createElement('li')
    li.textContent = q.text
    feed.appendChild(li)
  })
}

loadQuotes()
supabase.channel('realtime:quotes').on('postgres_changes', { event: '*', schema: 'public', table: 'quotes' }, loadQuotes).subscribe()