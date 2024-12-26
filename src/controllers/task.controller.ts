import {
  deleteTaskService,
  getTasksService,
  postTaskService,
  putTaskService,
  verifyExistenceService,
} from "@/services/task.service"
import { Request, Response } from "express"

export const getTasksController = async (req: Request, res: Response) => {
  try {
    const supabase = req.supabase
    const { error, data } = await supabase.auth.getUser()
    if (error) return res.status(401).json({ error: "Unauthorized" })

    const { error: taskError, data: tasksData } = await getTasksService(
      supabase,
      data.user?.id
    )
    if (taskError) {
      return res.status(400).json({ error: taskError.message })
    }

    return res.status(200).json(tasksData)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const postTaskController = async (req: Request, res: Response) => {
  try {
    const supabase = req.supabase
    const { error: userError, data: userData } = await supabase.auth.getUser()
    if (userError) return res.status(401).json({ error: "Unauthorized" })

    const { title, description, state } = req.body
    if (!title || !description || state === undefined)
      return res.status(400).json({ error: "Missing required fields" })

    const { error, data } = await postTaskService(supabase, {
      id_user: userData.user!.id,
      title,
      description,
      state,
    })
    if (error) {
      return res.status(400).json({ error: error.message })
    }

    return res.status(201).json(data)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const PutTaskController = async (req: Request, res: Response) => {
  try {
    const supabase = req.supabase
    const { error, data: userData } = await supabase.auth.getUser()
    if (error) return res.status(401).json({ error: "Unauthorized" })

    const taskId = req.params.id
    if (taskId === undefined)
      return res.status(400).json({ error: "Missing required fields" })

    const { title, description, state } = req.body
    if (!title || !description || state === undefined)
      return res.status(400).json({ error: "Missing required fields" })

    const exist = await verifyExistenceService(
      supabase,
      taskId,
      userData.user!.id
    )
    if (!exist) {
      return res.status(400).json({ error: "Task not found" })
    }

    const { error: updateError, data: taskData } = await putTaskService(
      supabase,
      {
        id_user: userData.user!.id,
        title,
        description,
        state,
        id: taskId,
      }
    )
    if (updateError) {
      return res.status(400).json({ error: updateError.message })
    }

    return res.status(200).json(taskData)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const deleteTaskController = async (req: Request, res: Response) => {
  try {
    const supabase = req.supabase
    const { error, data: userData } = await supabase.auth.getUser()
    if (error) return res.status(401).json({ error: "Unauthorized" })

    const taskId = req.params.id
    if (taskId === undefined)
      return res.status(400).json({ error: "Missing required fields" })

    const exist = await verifyExistenceService(
      supabase,
      taskId,
      userData.user!.id
    )
    if (!exist) {
      return res.status(400).json({ error: "Task not found" })
    }

    const { error: deleteError } = await deleteTaskService(
      supabase,
      taskId,
      userData.user!.id
    )
    if (deleteError) {
      return res.status(400).json({ error: deleteError.message })
    }

    return res
      .status(200)
      .json({ message: "Task deleted successfully", id: taskId })
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}
