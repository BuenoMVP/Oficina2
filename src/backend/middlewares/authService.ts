/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

import dotenv from "dotenv"
dotenv.config()

declare global {
    namespace Express { 
        interface Request {
            user?: string | JwtPayload
        }
    }
}

const secret = process.env.VITE_JWT_SECRET || 'default_secret'

const createToken = (user: object) => {
    const token = jwt.sign({data: user}, secret)
    
    return token
}

const verifyToken = (req: Request, res: Response, next: NextFunction):void => {
    const token = req.headers['authorization']?.split(' ')[1]

    if (!token){
        res.status(401).send({Error: 'Token não encontrado!'})
        return 
    }

    try {
        const decoded: string | JwtPayload = jwt.verify(token, secret)
        
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).send({'Token inválido': error})
        return 
    }
}

export { createToken, verifyToken }