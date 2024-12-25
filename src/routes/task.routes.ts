import { Router } from "express"
import { attachSupabaseClient } from "@/middlewares/supabaseToken.middleware"
import { PutTaskController, getTasksController, postTaskController } from "@/controllers/task.controller"

const router = Router()

router.get("/", attachSupabaseClient, getTasksController)
router.post("/", attachSupabaseClient, postTaskController)
router.put("/:id", attachSupabaseClient, PutTaskController)

export default router
