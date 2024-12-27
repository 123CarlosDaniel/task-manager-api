import { Response, NextFunction, Request } from "express"
import { getSupabaseClient } from "@/config/supabaseClient"

export const attachSupabaseClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1]
  const refreshToken = req.headers["x-refresh-token"] as string
  if (!token || !refreshToken) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  const supabase = getSupabaseClient()

  const { error } = await supabase.auth.setSession({
    access_token: token,
    refresh_token: refreshToken,
  })

  if (error) {
    console.log(error.message)
    return res.status(401).json({ error: "Unauthorized" })
  }
  req.supabase = supabase
  next()
}
