import { Router, Request, Response } from 'express'
import TaskType from '../types/task'
import { v4 as uuidv4 } from 'uuid' 
import Tasks from '../models/Task'

const router: Router = Router()

router.get('/', async ( req: Request, res: Response) => {
    const tasks: TaskType[] = await Tasks.find()
    res.render('tasks/index', { tasks })
})

router.route('/add')
.get((req: Request, res: Response) => {
    res.render('tasks/add', { tasks: [{name: "First Task"}]})
})
.post( async (req: Request, res: Response) => {
    const { name, description } = req.body

    // Creating a new task using a type
    const newTaskData: TaskType = {
        id: uuidv4(),
        name,
        description,
        done: false
    }

    const newTask = new Tasks(newTaskData)
    await newTask.save()
    res.redirect("/tasks/")
})

router.post('/clean', async (req: Request, res: Response) => {
    await Tasks.deleteMany()
    res.redirect('/tasks/')
})

export default router