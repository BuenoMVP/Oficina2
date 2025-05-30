import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const server = express()

server.use(bodyParser.json())

server.use(cors())

server.use('/', (_req: Request, res: Response) => {
    res.send('Funcionou')
})

export { server }