import { createClient } from '../supabase/server'

export async function getNews(includeDrafts = false) {
  const supabase = await createClient()
  let query = supabase
    .from('news')
    .select('*')
    .is('archived_at', null)
    .order('publication_date', { ascending: false })

  if (!includeDrafts) {
    query = query.or('status.eq.published,status.is.null').lte('publication_date', new Date().toISOString())
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching news:', error)
    return []
  }
  return data
}

export async function getNewsById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return null
  }
  return data
}

export async function upsertNews(newsData: any) {
  const supabase = await createClient()
  
  if (newsData.id && newsData.id !== 'new') {
    // Update
    const { data, error } = await supabase
      .from('news')
      .update(newsData)
      .eq('id', newsData.id)
      .select()
      .single()
    if (error) throw new Error(error.message)
    return data
  } else {
    // Create
    const { id, ...insertData } = newsData; // remove 'new' id
    const { data, error } = await supabase
      .from('news')
      .insert(insertData)
      .select()
      .single()
    if (error) throw new Error(error.message)
    return data
  }
}

export async function archiveNews(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('news')
    .update({ archived_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw new Error(error.message)
  return true
}
