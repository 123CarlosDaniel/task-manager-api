import { getSupabaseClient } from "@/config/supabaseClient"
import { Router } from "express"

const router = Router()

router.post("/login", async (req, res) => {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email: req.body.email,
    password: req.body.password,
  })
  if (error) return res.status(400).json({ error: error.message })

  return res.status(200).json(data)
})

export default router
