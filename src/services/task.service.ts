import { SupabaseClient } from "@supabase/supabase-js"

interface TaskPayload {
  title?: string
  description?: string
  state?: string
  id_user: string
  id?: string
}

export const getTasksService = async (
  supabase: SupabaseClient,
  userId?: string
) => {
  if (!userId) {
    throw new Error("User id is required")
  }

  const response = await supabase
    .from("tasks")
    .select("*")
    .eq("id_user", userId)

  return response
}

export const postTaskService = async (
  supabase: SupabaseClient,
  payload: TaskPayload
) => {
  const response = await supabase.from("tasks").insert({
    title: payload.title,
    description: payload.description,
    state: payload.state,
    id_user: payload.id_user,
  }).select("*")

  return response
}

export const putTaskService = async (
  supabase: SupabaseClient,
  payload: TaskPayload
) => {
  const response = await supabase
    .from("tasks")
    .update({
      ...(payload.title && { title: payload.title }),
      ...(payload.description && { description: payload.description }),
      ...(payload.state && { state: payload.state }),
    })
    .eq("id", payload.id)
    .eq("id_user", payload.id_user)
    .select("*")
  return response
}

export const verifyExistenceService = async (
  supabase: SupabaseClient,
  taskId: string,
  userId: string
) => {
  const {error, data} = await supabase
    .from("tasks")
    .select("id")
    .eq("id", taskId)
    .eq("id_user", userId)
  if (error || data.length === 0) return false
  return true
}
