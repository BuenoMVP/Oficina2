import express, { Request, Response } from "express"

const router = express.Router()

router.use('/', (_req: Request, res: Response) => {
    res.send('Página inicial da api')
})

export default router