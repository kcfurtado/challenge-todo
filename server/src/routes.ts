import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { AuthController } from './controllers/AuthController'
import { ProjectController } from './controllers/ProjectController'
import { TaskController } from './controllers/TaskController'
import { prisma } from './prisma'
import { ensureAuthenticateUser } from './middlewares/ensureAuthenticateUser'

const router = Router()


const userController = new UserController()
const authController = new AuthController()
const projectController = new ProjectController()
const taskController = new TaskController()

router.get('/users', async (req, res) => {
    const user = await prisma.user.findMany()
    res.json({ user })
})

router.post('/users', userController.save)

router.post('/auth', authController.signIn)

/** project routes **/
router.get('/projects', ensureAuthenticateUser, projectController.all)
router.get('/projects/:id', ensureAuthenticateUser, projectController.show)
router.post('/projects', ensureAuthenticateUser, projectController.save)
router.put('/projects/:id', ensureAuthenticateUser, projectController.update)
router.delete('/projects/:id', ensureAuthenticateUser, projectController.delete)

/** tasks routes **/
router.get('/projects/tasks/:projectId', ensureAuthenticateUser, taskController.all)
router.get('/tasks/:id', ensureAuthenticateUser, taskController.show)
router.post('/tasks', ensureAuthenticateUser, taskController.save)
router.put('/tasks/:id', ensureAuthenticateUser, taskController.update)
router.delete('/tasks/:id', ensureAuthenticateUser, taskController.delete)

export { router }