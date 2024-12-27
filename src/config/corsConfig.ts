import { APP_URL } from "@/lib/vars"
import cors from "cors"

export const corsOptions = {
  origin: ["*", APP_URL],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-refresh-token"],
  credentials: true,
} as cors.CorsOptions
