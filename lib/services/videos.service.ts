import { createClient } from '../supabase/server'

export async function getVideos() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .is('archived_at', null)
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching videos:', error)
    return []
  }
  return data
}

export async function upsertVideo(videoData: any) {
  const supabase = await createClient()
  
  if (videoData.id && videoData.id !== 'new') {
    const { data, error } = await supabase
      .from('videos')
      .update(videoData)
      .eq('id', videoData.id)
      .select()
      .single()
    if (error) throw new Error(error.message)
    return data
  } else {
    const { id, ...insertData } = videoData;
    const { data, error } = await supabase
      .from('videos')
      .insert(insertData)
      .select()
      .single()
    if (error) throw new Error(error.message)
    return data
  }
}

export async function archiveVideo(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('videos')
    .update({ archived_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw new Error(error.message)
  return true
}
