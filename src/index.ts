import app from "./app"
import { API_PORT } from "./lib/vars"

const PORT = API_PORT || 3000

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
