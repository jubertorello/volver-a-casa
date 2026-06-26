import { createClient } from '../supabase/server'

export async function getSettings(key: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('settings')
    .select('data')
    .eq('key', key)
    .single()

  if (error) {
    return null
  }
  return data.data
}

export async function upsertSettings(key: string, dataObj: any) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('settings')
    .upsert({ key, data: dataObj, updated_at: new Date().toISOString() }, { onConflict: 'key' })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function getGlobalSeo() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('seo_global')
    .select('*')
    .eq('id', '00000000-0000-0000-0000-000000000001')
    .single()

  if (error) return null
  return data
}

export async function updateGlobalSeo(updates: any) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('seo_global')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', '00000000-0000-0000-0000-000000000001')
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}
