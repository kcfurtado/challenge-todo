import { Request, Response } from "express";
import { prisma } from "../prisma";

export class ProjectController {
    async save(req: Request, res: Response) {
        const { title, description } = req.body

        const userId = req.userId

        const project = await prisma.project.create({
            data: {
                title,
                description,
                userId
            }
        })

        return res.status(200).json(project)
    }

    async update(req: Request, res: Response) {
        const { title, description } = req.body
        const { id } = req.params

        const project = await prisma.project.update({
            where: { id: Number(id) },
            data: {
                title,
                description,
            }
        })

        return res.status(200).json(project)
    }

    async all(req: Request, res: Response) {
        const userId = req.userId

        const projects = await prisma.project.findMany({ where: { userId } })

        return res.status(200).json(projects)
    }

    async show(req: Request, res: Response) {
        const { id } = req.params
        const project = await prisma.project.findFirst({ where: { id: Number(id) } })
        return res.status(200).json(project)
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params
        await prisma.project.delete({ where: { id: Number(id) } })
        return res.status(200).json({})
    }
}