import { server } from "./config/server"

import dotenv from "dotenv"
dotenv.config()

import { connectDB } from "./config/connectDB"
connectDB()

const port = process.env.VITE_PORT || 8081

server.listen(port, () => {
    console.log('Server runnig on port: '+port)
})