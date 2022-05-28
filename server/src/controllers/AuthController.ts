import { Request, Response } from "express";
import Bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import { prisma } from "../prisma";

export class AuthController {
    async signIn(req: Request, res: Response) {
        const { email, password } = req.body

        const user = await prisma.user.findFirst({ where: { email } })

        if (!user) return res.status(404).json({})

        const isMatch = await Bcrypt.compare(password, user.password)

        if (!isMatch) return res.status(401).json({})

        const token = JWT.sign({ name: user.name }, process.env.JWT_SECRET, { expiresIn: '1d', subject: String(user.id) })

        return res.status(200).json({
            name: user.name,
            token
        })
    }
}