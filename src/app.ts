import express from "express"
import morgan from "morgan"
import authRoutes from "@/routes/auth.routes"
import taskRoutes from "@/routes/task.routes"
import cors from "cors"
import { corsOptions } from "./config/corsConfig"
import swaggerUi from "swagger-ui-express"
import { middleware } from "express-openapi-validator"
import path from "path"

const app = express()

app.use(cors(corsOptions))

app.use(express.json())

// configurar swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
)

// Servir el archivo openapi
app.use(
  "/openapi.json",
  express.static(path.join(__dirname, "../openapi.yaml"))
)

// Validar las rutas con OpenAPI
app.use(
  middleware({
    apiSpec: path.join(__dirname, "../openapi.yaml"),
    validateRequests: true, // Validar las solicitudes entrantes
  })
)

app.use(morgan("dev"))

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
    version: "1.0.0",
    status: "success",
    docs: "/api-docs",
  })
})
app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)

export default app
