import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import 'express-async-errors'
import { router } from './routes'

const app = express()

app.use(cors())

app.use(express.json()) // to parse application/json content type

app.use(express.urlencoded({ extended: true })) // to parse application/x-www-form-urlencoded content type

app.use(router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof Error) return res.status(400).json({ message: err.message });

    return res.status(500).json({ message: 'Server error!' });
});

app.listen(5000, () => {
    console.log('- SERVER RUNNING...')
})