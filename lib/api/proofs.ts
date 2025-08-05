import { supabase, SUPABASE_URL } from '@/lib/supabase'
import * as FileSystem from 'expo-file-system'

export const uploadProofImage = async (
    taskId: string,
    subtaskIndex: number,
    fileUri: string
  ) => {
    const fileName = fileUri.split('/').pop() || `proof_${Date.now()}.jpg`
    const path = `${taskId}/${subtaskIndex}/${Date.now()}_${fileName}`
    const contentType = getMimeTypeFromFilename(fileName)
  
    const session = supabase.auth.session()
    const token = session?.access_token

  
    if (!token) throw new Error('No session token found for upload.')
  
    const uploadUrl = `${SUPABASE_URL}/storage/v1/object/proofs/${path}`
  
    const response = await FileSystem.uploadAsync(uploadUrl, fileUri, {
      httpMethod: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': contentType,
        'x-upsert': 'true',
      },
      uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
    })
  
    if (response.status !== 200 && response.status !== 201) {
      console.error('Upload failed', response)
      throw new Error(`Upload failed with status ${response.status}`)
    }
  
    return { path }
  }
  
  const getMimeTypeFromFilename = (filename: string) => {
    if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) return 'image/jpeg'
    if (filename.endsWith('.png')) return 'image/png'
    return 'application/octet-stream'
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

