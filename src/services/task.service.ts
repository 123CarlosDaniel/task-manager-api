import { SupabaseClient } from "@supabase/supabase-js"

interface CreateTaskPayload {
  title: string
  description: string
  state: string
  id_user: string
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
  payload: CreateTaskPayload
) => {
  const response = await supabase.from("tasks").insert(payload)

  return response
}
