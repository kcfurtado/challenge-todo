export interface IProject {
    id:number
    title: string
    description: string
    status?: 'ACTIVE' | 'DELETED'
    createdAt?: Date
    updatedAt?: Date
    tasks: ITask[]
}

export interface ITask {
    id:number
    title: string
    description: string
    status?: 'PENDING' | 'DONE' | 'DELETED'
    createdAt?: Date
    updatedAt?: Date
}