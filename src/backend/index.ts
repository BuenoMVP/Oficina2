import { server } from "./config/server"

import dotenv from "dotenv"
dotenv.config()

const port = process.env.VITE_PORT || 8081

server.listen(port, () => {
    console.log('Server runnig on port: '+port)
})