import express, { Request, Response } from "express";
import emailController from "../controllers/emailController";

const router = express.Router()

router.post('/recuperar-senha', (req: Request, res: Response) => {
    emailController.recuperarSenha(req, res);
})

router.post('/alterar-senha', (req: Request, res: Response) => {
    emailController.alterarSenha(req, res);
})

export default router