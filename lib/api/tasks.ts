import { supabase } from '../supabase'

export const getTasksByDate = async (userId: string, date: string) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .eq('assigned_date', date)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getTaskById(id: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select(`
      *,
      subtasks (
        id,
        text,
        required_proof,
        checked
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching task:', error)
    throw error
  }

  const subtasks = (data.subtasks || []).map((s: any) => ({
    id: s.id,
    text: s.text,
    requiredProof: s.required_proof,
    checked: s.checked,
  }))

  return {
    ...data,
    subtasks,
  }
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
    .eq('id', taskId)

  if (error) throw error
}

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

export type Subtask = {
  id: string
  text: string
  checked: boolean
  required_proof: boolean
  proof_urls?: string[]
}


type AssignTaskInput = {
  title: string
  description: string
  instructions?: string
  assigned_date: string
  user_id: string
  subtasks: Subtask[]
}

export async function assignTask(task: AssignTaskInput) {
  const { subtasks, ...taskData } = task

  const { data: taskInsert, error: taskError } = await supabase
    .from('tasks')
    .insert([{
      ...taskData,
      status: 'Not Started',
    }])
    .select()
    .single()

  if (taskError) {
    console.error('Error assigning task:', taskError)
    throw taskError
  }

  const subtasksWithTaskId = subtasks.map((subtask) => ({
    task_id: taskInsert.id,
    text: subtask.text,
    required_proof: subtask.required_proof ?? false,
    checked: false
  }))

  const { error: subtasksError } = await supabase
    .from('subtasks')
    .insert(subtasksWithTaskId)

  if (subtasksError) {
    console.error('Error inserting subtasks:', subtasksError)
    throw subtasksError
  }

  return taskInsert
}

export async function updateSubtaskStatus(taskId: string, subtasks: { id: string; checked: boolean }[]) {
  const updates = subtasks.map(async (subtask) => {
    const { error } = await supabase
      .from('subtasks')
      .update({ checked: subtask.checked })
      .eq('id', subtask.id)
      .eq('task_id', taskId)

    if (error) {
      console.error(`Failed to update subtask ${subtask.id}`, error)
      throw error
    }
  })

  await Promise.all(updates)
}

export async function getOngoingTasksForToday() {
  const today = new Date().toISOString().split('T')[0] 

  const { data, error } = await supabase
    .from('tasks')
    .select(`
      *,
      subtasks (
        id,
        checked
      )
    `)
    .eq('assigned_date', today)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching ongoing tasks:', error)
    throw error
  }

  return data
}
