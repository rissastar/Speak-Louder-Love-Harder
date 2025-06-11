import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient(
  'https://ytgrzhtntwzefwjmhgjj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8'
)

async function uploadWorksheet() {
  const fileInput = document.getElementById('worksheetFile')
  const titleInput = document.getElementById('worksheetTitle')
  const file = fileInput.files[0]
  const title = titleInput.value
  const { data: user } = await supabase.auth.getUser()

  if (!file || !title || !user.user) return alert("Missing title, file, or user")

  const filePath = `${user.user.id}/${Date.now()}_${file.name}`
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('worksheets')
    .upload(filePath, file)

  if (uploadError) return alert("Upload failed: " + uploadError.message)

  const { data: publicUrlData } = supabase.storage.from('worksheets').getPublicUrl(filePath)

  const { error: insertError } = await supabase.from('worksheets').insert({
    title: title,
    file_url: publicUrlData.publicUrl,
    user_id: user.user.id
  })

  if (!insertError) {
    fileInput.value = ''
    titleInput.value = ''
    loadWorksheets()
  }
}

async function loadWorksheets() {
  const { data, error } = await supabase.from('worksheets').select('*').order('created_at', { ascending: false })
  const feed = document.getElementById('worksheetFeed')
  feed.innerHTML = ''
  data.forEach(w => {
    const li = document.createElement('li')
    li.innerHTML = `<strong>${w.title}</strong> - <a href="${w.file_url}" target="_blank">View PDF</a>`
    feed.appendChild(li)
  })
}

loadWorksheets()
supabase.channel('realtime:worksheets')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'worksheets' }, loadWorksheets)
  .subscribe()