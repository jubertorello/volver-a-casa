import { createClient } from '../supabase/server'

// Obtiene todas las paginas principales (Home, Actualidad, etc)
export async function getPages() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .is('archived_at', null)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching pages:', error)
    return []
  }
  return data
}

// Obtiene una pagina y sus bloques
export async function getPageBySlug(slug: string) {
  const supabase = await createClient()
  
  // 1. Obtener la pagina
  const { data: page, error: pageError } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .single()

  if (pageError || !page) {
    console.error('Error fetching page:', pageError)
    return null
  }

  // 2. Obtener los bloques de esa pagina
  const { data: blocks, error: blocksError } = await supabase
    .from('page_blocks')
    .select('*')
    .eq('page_id', page.id)
    .order('order_index', { ascending: true })

  return {
    ...page,
    blocks: blocks || []
  }
}

// Actualiza una pagina (informacion general)
export async function updatePage(id: string, updates: any) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('pages')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

// Actualizar un bloque especifico
export async function upsertPageBlock(pageId: string, type: string, content_json: any, order_index: number = 0) {
  const supabase = await createClient()
  
  // Buscar si ya existe ese bloque
  const { data: existingBlock } = await supabase
    .from('page_blocks')
    .select('id')
    .eq('page_id', pageId)
    .eq('type', type)
    .single()

  if (existingBlock) {
    // Update
    const { data, error } = await supabase
      .from('page_blocks')
      .update({ content_json, order_index })
      .eq('id', existingBlock.id)
      .select()
      .single()
    if (error) throw new Error(error.message)
    return data
  } else {
    // Insert
    const { data, error } = await supabase
      .from('page_blocks')
      .insert({ page_id: pageId, type, content_json, order_index })
      .select()
      .single()
    if (error) throw new Error(error.message)
    return data
  }
}
