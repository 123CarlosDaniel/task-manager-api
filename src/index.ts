import express from "express";
import morgan from "morgan";

const app = express()

app.use(morgan("dev"))
app.use(express.json())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})