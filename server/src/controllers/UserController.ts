import { Request, Response } from "express";
import Bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'
import { prisma } from "../prisma";

export class UserController {
    async save(req: Request, res: Response) {
        const saltRounds = 10
        const {
            name,
            email,
            password
        } = req.body

        const salt = Bcrypt.genSaltSync(saltRounds);
        const passwordHash = await Bcrypt.hash(password, salt)

        const user = await prisma.user.create({
            data: {
                password: passwordHash,
                name,
                email
            }
        })

        const token = JWT.sign({ name: user.name }, process.env.JWT_SECRET, { expiresIn: '1d', subject: String(user.id) })

        return res.status(201).json({
            name,
            token
        })
    }
}