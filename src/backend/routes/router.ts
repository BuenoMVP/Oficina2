import express, { Request, Response } from "express"
import usuariosRouter from "./usuarios"
import integrantesRouter from "./integrantes"
import certificadosRouter from "./certificados"
import emailRouter from "./email"
import { verifyToken } from "../middlewares/authService"

const router = express.Router()

router.use('/usuarios', usuariosRouter)
router.use('/integrantes', verifyToken, integrantesRouter)
router.use('/certificados', verifyToken, certificadosRouter)
router.use('/email', emailRouter)

router.use('/', (_req: Request, res: Response) => {
    res.send('Página inicial da api')
})

export default router