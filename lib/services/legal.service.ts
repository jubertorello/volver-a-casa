import { createClient } from '../supabase/server'

export async function getLegalPages() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('legal_pages')
    .select('*')
    .is('archived_at', null)
    .order('title', { ascending: true })

  if (error) {
    console.error('Error fetching legal pages:', error)
    return []
  }
  return data
}

export async function getLegalPageBySlug(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('legal_pages')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return null
  }
  return data
}

export async function updateLegalPage(id: string, updates: any) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('legal_pages')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}
