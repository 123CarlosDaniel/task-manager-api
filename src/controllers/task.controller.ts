import { getTasksService, postTaskService } from "@/services/task.service"
import { Request, Response } from "express"

export const getTasksController = async (req: Request, res: Response) => {
  try {
    const supabase = req.supabase
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

export const postTaskController = async (req: Request, res: Response) => {
  try {
    const supabase = req.supabase
    const user = await supabase.auth.getUser()

    if (!user) return res.status(401).json({ error: "Unauthorized" })

    const {title, description, state} = req.body
    if(!title || !description || state === undefined) return res.status(400).json({ error: "Missing required fields" })

    const result = await postTaskService(supabase, {
      id_user: user.data.user!.id,
      title,
      description,
      state
    })

    if(!result || result?.error) {
      return res.status(400).json({ error: result?.error?.message })
    }

    return res.status(201).json(result.data)
  }
  catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

