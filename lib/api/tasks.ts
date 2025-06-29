import { supabase } from '../supabase';

export const getTasksByDate = async (userId: string, date: string) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .eq('assigned_date', date)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const submitTask = async (
    taskId: string,
    proofUrl?: string,
    notes?: string
  ) => {
    const { error } = await supabase
      .from('tasks')
      .update({
        status: 'submitted',
        proof_url: proofUrl || null,
        notes: notes || null,
      })
      .eq('id', taskId);
  
    if (error) throw error;
  };
  
