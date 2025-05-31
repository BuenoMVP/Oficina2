import { Schema, model } from "mongoose"
import { integrantesProps } from "../types/bdTypes"

const integrantesSchema = new Schema<integrantesProps>({
    nome: { 
        type: String, 
        required: true 
    },
    dataNascimento: { 
        type: String, 
        required: true 
    },
    escola: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    telefone: { 
        type: String, 
        required: true 
    }
})

const schemaIntegrantes = model("integrantes", integrantesSchema)

export default schemaIntegrantes