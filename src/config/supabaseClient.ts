import { SupabaseClient, createClient } from "@supabase/supabase-js"
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "../lib/vars"

let supabase: SupabaseClient | null = null

export const getSupabaseClient = () => {
  if (!supabase) {
    supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!)
  }
  return supabase
}
