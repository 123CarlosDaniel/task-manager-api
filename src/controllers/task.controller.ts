import { getTasksService } from "@/services/task.service"
import { Request, Response } from "express"

export const getTasksController = async (req: Request, res: Response) => {
  try {
    const supabase = req.supabase
    if (!supabase) {
      return res.status(500).json({ error: "Supabase client is missing" })
    }
    const user = await supabase.auth.getUser()
    if (!user) return res.status(401).json({ error: "Unauthorized" })

    const tasks = await getTasksService(supabase, user.data.user?.id)

    if (!tasks || tasks?.error) {
      return res.status(400).json({ error: tasks?.error?.message })
    }
    return res.status(200).json(tasks.data)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}
