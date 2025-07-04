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

export async function getTaskById(id: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

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
  
  export async function getPendingTasks() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('status', 'submitted')
  
    if (error) {
      console.error('Error fetching pending tasks:', error)
      throw error
    }
  
    return data
  }
  
  export async function updateTaskStatus(taskId: string, newStatus: string) {
    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', taskId)
  
    if (error) {
      console.error('Failed to update task status:', error)
      throw error
    }
  }

  export async function assignTask(task: {
    title: string
    description: string
    instructions: string
    assigned_date: string
    user_id: string
  }) {
    const { error } = await supabase.from('tasks').insert([{
      ...task,
    }])
  
    if (error) {
      console.error('Error assigning task:', error)
      throw error
    }
  }