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
    telefone: { 
        type: String, 
        required: true 
    },
    cpf: { 
        type: String, 
        required: true 
    },
    rg: {
        type: String,
        required: true
    },
    escola: { 
        type: String, 
        required: true 
    },
    nomeResponsavel: {
        type: String,
        required: true
    },
    telefoneResponsavel: {
        type: String,
        required: true
    },
    emailResponsavel: {
        type: String,
        required: true
    },
    cpfResponsavel: {
        type: String,
        required: true
    },
    endereco: {
        type: String,
        required: true
    }
})

const schemaIntegrantes = model("integrantes", integrantesSchema)

export default schemaIntegrantes