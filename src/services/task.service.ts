import { SupabaseClient } from "@supabase/supabase-js"

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
