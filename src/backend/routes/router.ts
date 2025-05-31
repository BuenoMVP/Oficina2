import express, { Request, Response } from "express"
import usuariosRouter from "./usuarios"

const router = express.Router()

router.use('/usuarios', usuariosRouter)

router.use('/', (_req: Request, res: Response) => {
    res.send('Página inicial da api')
})

export default router