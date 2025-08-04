import { supabase } from '@/lib/supabase'

export async function uploadProofImage(taskId: string, subtaskIndex: number, file: File) {
  const filePath = `${taskId}/${subtaskIndex}/${Date.now()}_${file.name}`

  const { error } = await supabase.storage.from('proofs').upload(filePath, file, {
    cacheControl: '3600',
    upsert: false,
  })

  if (error) throw error

  const { data } = supabase.storage.from('proofs').getPublicUrl(filePath)
  return data?.publicURL
}

export async function listProofImages(taskId: string, subtaskIndex: number) {
  const { data, error } = await supabase
    .storage
    .from('proofs')
    .list(`${taskId}/${subtaskIndex}`, { limit: 100 })

  if (error) throw error

  return data?.map(file => {
    const { data: publicData } = supabase
      .storage
      .from('proofs')
      .getPublicUrl(`${taskId}/${subtaskIndex}/${file.name}`)
    return {
      name: file.name,
      url: publicData?.publicURL,
    }
  })
}

export async function deleteProofImage(taskId: string, subtaskIndex: number, fileName: string) {
  const path = `${taskId}/${subtaskIndex}/${fileName}`
  const { error } = await supabase.storage.from('proofs').remove([path])
  if (error) throw error
}

