import { Router } from "express"
import { attachSupabaseClient } from "@/middlewares/supabaseToken.middleware"
import {
  PutTaskController,
  deleteTaskController,
  getTasksController,
  postTaskController,
} from "@/controllers/task.controller"

const router = Router()

router.get("/", attachSupabaseClient, getTasksController)
router.post("/", attachSupabaseClient, postTaskController)
router.put("/:id", attachSupabaseClient, PutTaskController)
router.delete("/:id", attachSupabaseClient, deleteTaskController)

export default router
