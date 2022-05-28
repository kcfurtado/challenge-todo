import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'
export async function ensureAuthenticateUser(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ message: 'Authentication error' })
    const [, token] = authHeader.split(' ')

    try {
        const { sub } = verify(token, process.env.JWT_SECRET)
        req.userId = Number(sub)
        return next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token!' })
    }
}
