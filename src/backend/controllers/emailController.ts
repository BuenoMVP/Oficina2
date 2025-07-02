import { Request, Response } from 'express';
import schemaUsuarios from '../models/Usuarios';
import schemaSenhas from '../models/Senhas';
import { hash } from 'bcryptjs';
import sendEmail from '../config/email.config';

const geraCodigo = (): string => {
    const min = 0;
    const max = 9999;
    const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomCode.toString().padStart(4, '0');
}

const emailController = {
    recuperarSenha: async (req: Request, res: Response) => {
        try {
            const { email } = req.body;

            const validEmail = await schemaUsuarios.find({
                email: email
            })
        
            if (validEmail.length <= 0)
                return res.status(400).json({ msg: "Email não encontrado!" });

            const tokenRecuperacao = geraCodigo();

            const now = new Date();
            now.setHours(now.getHours() + 1);

            await schemaSenhas.findOneAndUpdate(
                { email: email },
                {
                    email: email,
                    senhaResetToken: tokenRecuperacao,
                    senhaResetExpires: now
                },
                { upsert: true, new: true }
            )

            const mailContent = {
                subject: "Recuperação de senha",
                text: `Seu código de recuperação é: ${tokenRecuperacao}`,
                html: `<h1>Recuperação de Senha</h1>
                <p>Seu código de recuperação é: <strong>${tokenRecuperacao}</strong></p>
                `
              }

            await sendEmail(email, mailContent)

            res.status(200).json({ msg: "Email enviado com sucesso!" });

        } catch (error) {
            res.status(400).json({ "Erro ao recuperar senha": error });
        }
    },

    alterarSenha: async (req: Request, res: Response) => {
        try {
            const { email, token, novaSenha } = req.body

            const validEmail = await schemaUsuarios.find({
                email: email
            })
        
            if (validEmail.length <= 0)
                return res.status(400).json({ msg: "Email não encontrado!" });

            const senhaData = await schemaSenhas.findOne({ email: email }).select('+senhaResetToken +senhaResetExpires');

            if (!senhaData)
                return res.status(400).json({ msg: "Token não encontrado!" });

            if (token !== senhaData.senhaResetToken)
                return res.status(400).json({ msg: "Token inválido!" });

            const now = new Date();

            if (now > senhaData.senhaResetExpires)
                return res.status(400).json({ "Token expirado": "Solicite um novo token!"});

            const user = validEmail[0];
            await schemaUsuarios.findByIdAndUpdate(user._id, {
                senha: await hash(novaSenha, 8)
            });

            await schemaSenhas.findOneAndDelete({ email: email });

            res.status(200).json({ msg: "Senha alterada com sucesso!" });

        } catch (error) {
            res.status(400).json({ "Erro ao alterar nova senha": error })
        }
    }
}

export default emailController;