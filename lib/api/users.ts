import { supabase } from '../supabase'

export async function getAllEmployees() {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('id, name')
    .eq('role', 'employee')

  if (error) throw error
  return data
}
