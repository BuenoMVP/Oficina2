import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from '../routes/router'

const server = express()

server.use(bodyParser.json())

server.use(cors())

server.get('/', (_req: Request, res: Response) => {
    res.send('Funcionou')
})

server.use('/api', router)

export { server }