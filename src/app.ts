import express from "express"
import morgan from "morgan"
import authRoutes from "@/routes/authRoutes"
import taskRoutes from "@/routes/taskRoutes"

const app = express()

app.use(morgan("dev"))
app.use(express.json())


app.use("/auth", authRoutes)
app.use("/tasks", taskRoutes)

export default app
