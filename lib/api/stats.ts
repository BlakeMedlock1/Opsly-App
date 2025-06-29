import { supabase } from "../supabase";


export async function getUserStats(userId: string) {
    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single()
  
    if (error) throw error
    return data
  }
  

export const updateStatsForTask = async (userId: string, field: 'tasks_completed' | 'tasks_submitted', increment = 1) => {
  const today = new Date().toISOString().slice(0, 10);

  const { data: existing, error: fetchError } = await supabase
    .from('stats')
    .select('*')
    .eq('user_id', userId)
    .eq('date', today)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

  if (existing) {
    const { error: updateError } = await supabase
      .from('stats')
      .update({ [field]: existing[field] + increment })
      .eq('id', existing.id);

    if (updateError) throw updateError;
  } else {
    const { error: insertError } = await supabase
      .from('stats')
      .insert({
        user_id: userId,
        date: today,
        [field]: increment,
      });

    if (insertError) throw insertError;
  }
};
