import { Schema, model } from "mongoose"
import { usuariosProps } from "../types/bdTypes"

const usuariosSchema = new Schema<usuariosProps>({
    nome: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    senha: { 
        type: String, 
        required: true 
    }
})

const schemaUsuarios = model("usuarios", usuariosSchema)

export default schemaUsuarios