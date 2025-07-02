import { Schema, model } from "mongoose"
import { senhasProps } from "../types/bdTypes"

const senhasSchema = new Schema<senhasProps>({
    email: { 
        type: String, 
        required: true 
    },
    senhaResetToken: { 
        type: String, 
        required: true,
        select: false
    },
    senhaResetExpires: { 
        type: Date, 
        required: true,
        select: false
    }
})

const schemaSenhas = model("senhas", senhasSchema)

export default schemaSenhas