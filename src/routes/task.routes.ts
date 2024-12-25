import { Router } from "express"
import { attachSupabaseClient } from "@/middlewares/supabaseToken.middleware"
import { getTasksController, postTaskController } from "@/controllers/task.controller"

const router = Router()

router.get("/", attachSupabaseClient, getTasksController)
router.post("/", attachSupabaseClient, postTaskController)

export default router
