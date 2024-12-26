import { config } from "dotenv"

config()
export const SUPABASE_URL = process.env.SUPABASE_PROJECT_URL
export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY
export const APP_URL = process.env.APP_URL
export const API_PORT = process.env.PORT