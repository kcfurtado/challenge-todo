import { Request, Response } from "express";
import { prisma } from "../prisma";

export class TaskController {
    async save(req: Request, res: Response) {
        const { projectId, title, description, endDate } = req.body

        const task = await prisma.task.create({
            data: {
                title,
                description,
                endDate,
                projectId,
            }
        })

        return res.status(200).json(task)
    }

    async update(req: Request, res: Response) {
        const { title, description, endDate, status } = req.body
        const { id } = req.params

        let task = await prisma.task.findUnique({ where: { id: Number(id) } })

        if (task.status === 'DONE') return res.status(403).json({})

        task = await prisma.task.update({
            where: { id: Number(id) },
            data: {
                title,
                description,
                endDate,
                status
            }
        })

        return res.status(200).json(task)
    }

    async all(req: Request, res: Response) {
        const { projectId } = req.params

        const tasks = await prisma.task.findMany({ where: { projectId: Number(projectId) } })

        return res.status(200).json(tasks)
    }

    async show(req: Request, res: Response) {
        const { id } = req.params
        const task = await prisma.task.findFirst({ where: { id: Number(id) } })
        return res.status(200).json(task)
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params
        await prisma.task.delete({ where: { id: Number(id) } })
        return res.status(200).json({})
    }
}