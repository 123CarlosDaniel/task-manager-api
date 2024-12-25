import { Router } from "express"
import { attachSupabaseClient } from "@/middlewares/supabaseToken.middleware"
import { getTasksController } from "@/controllers/task.controller"

const router = Router()

router.get("/", attachSupabaseClient, getTasksController)

export default router
