import express, { Request, Response } from "express"
import usuariosController from "../controllers/usuariosController"

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
    usuariosController.getAllUsuarios(req, res)
})

router.post('/', (req: Request, res: Response) => {
    usuariosController.postUsuario(req, res)
})

router.put('/:id', (req: Request, res: Response) => {
    usuariosController.updateUsuario(req, res)
})

router.delete('/:id', (req: Request, res: Response) => {
    usuariosController.deleteUsuario(req, res)
})

export default router