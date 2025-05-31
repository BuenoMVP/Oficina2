import mongoose from "mongoose"

import dotenv from "dotenv"
dotenv.config()

const db_user = process.env.VITE_DB_HOST
const db_password = process.env.VITE_DB_PASSWORD

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(`mongodb+srv://${db_user}:${db_password}@cluster0.zpqxgwh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        console.log('MongoDB Connected')
    } catch (err) {
        console.error('Error connect DB: '+err)
        process.exit(1)
    }
}

export { connectDB }