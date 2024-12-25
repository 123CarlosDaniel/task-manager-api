import { Router, Request, Response } from "express";
import { attachSupabaseClient } from "@/middlewares/supabaseTokenMiddleware";

const router = Router()

router.get("/", attachSupabaseClient, async(req: Request,res: Response) => {
  const supabase = req.supabase
  const user = await supabase?.auth.getUser()
  if(!user) return res.status(401).json({ error: "Unauthorized" })
  
  const response = await supabase?.from("tasks").select("*").eq("id_user", user.data.user?.id)
  if(!response || response?.error) {
    return res.status(400).json({ error: response?.error?.message })
  }

  return res.status(200).json(response.data)

})

export default router