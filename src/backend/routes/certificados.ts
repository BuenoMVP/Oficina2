import express, { Request, Response } from "express"
import certificadosController from "../controllers/certificadosController"

const router = express.Router()

router.post('/', (req: Request, res: Response) => {
    certificadosController.getCertificados(req, res)
})

export default router