import express from "express"
import morgan from "morgan"
import authRoutes from "@/routes/auth.routes"
import taskRoutes from "@/routes/task.routes"

const app = express()

app.use(morgan("dev"))
app.use(express.json())


app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)

export default app
