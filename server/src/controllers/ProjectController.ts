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

        const projects = await prisma.project.findMany({
            where: {
                userId
            },
            include: {
                tasks: {
                    orderBy: {
                        status: 'asc',
                    }
                }
            }
        })

        return res.status(200).json(projects)
    }

    async show(req: Request, res: Response) {
        const { id } = req.params
        const project = await prisma.project.findFirst({
            where: {
                id: Number(id)
            },
            include: {
                tasks: {
                    orderBy: {
                        status: 'desc',
                        createdAt: 'asc'
                    },
                    select: {
                        title: true,
                        description:true
                    },
                }
            }
        })
        return res.status(200).json(project)
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const deleteTasks = prisma.task.deleteMany({
                where: {
                    projectId: Number(id)
                }
            })
            const deleteProject = prisma.project.delete({
                where: {
                    id: Number(id)
                }
            })

            await prisma.$transaction([deleteTasks, deleteProject])
            return res.status(200).json({})
        } catch (error) {
            return res.status(500).json({})
        }

    }
}