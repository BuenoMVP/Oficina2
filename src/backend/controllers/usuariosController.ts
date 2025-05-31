import { Request, Response } from "express";
import schemaUsuarios from "../models/Usuarios";
import { usuariosProps } from "../types/bdTypes";

const usuariosController = {
  postUsuario: async (req: Request, res: Response) => {
    try {
      const usuario: usuariosProps = { ...req.body };

      const validUser = await schemaUsuarios.find({
        email: usuario.email
      })

      if (validUser.length > 0)
        return res.status(400).json({ msg: "Usuário já cadastrado!" });

      const novoUsuario = {
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha
      }

      const objUsuario = await schemaUsuarios.create(novoUsuario);

      if (!objUsuario)
        return res.status(400).json({ msg: "Usuário não criado!" });

      res.status(201).json({ objUsuario, msg: "Usuário criado!" });
    } catch (error) {
      res.status(400).json({ "Erro ao adicionar usuário": error });
    }
  },

  getAllUsuarios: async (_req: Request, res: Response) => {
    try {
      const objUsuarios = await schemaUsuarios.find();

      if (!objUsuarios)
        return res.status(404).json({ msg: "Usuários não encontrados!" });

      res.status(200).send(objUsuarios);
    } catch (error) {
      res.status(400).json({ "Erro ao resgatar usuários": error });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, senha } = req.body;

      const validUser = await schemaUsuarios.find({ email: email });

      if (validUser.length <= 0)
        return res.status(404).json({ msg: "Usuário não encontrado!" });

      if (senha  != validUser[0].senha)
        return res.status(401).json({ msg: "Senha inválida!" });

      res.status(200).json({ "Usuario logado": "Login efetuado com sucesso" });
    } catch (error) {
      res.status(400).json({ "Erro ao logar": error });
    }
  }
};

export default usuariosController;
