import { Router, Request, Response } from "express"
import TaskType from "../types/task"
import { v4 as uuidv4 } from "uuid"
import Tasks from "../models/Task"

const router: Router = Router()

router.get("/", async (req: Request, res: Response) => {
  const tasks: TaskType[] = await Tasks.find()
  res.render("tasks/index", { tasks })
})

router
  .route("/raw")
  .get(async (req: Request, res: Response) => {
    const tasks: TaskType[] = await Tasks.find()
    res.send(tasks)
  })
  .delete(async (req: Request, res: Response) => {
    await Tasks.deleteMany()
    res.status(200)
    res.send({ message: "All tasks deleleted succesfully" })
  })

router
  .route("/raw/:id")
  .get(async (req: Request, res: Response) => {
    const id = req.params.id
    const task: TaskType = await Tasks.findById(id)
    res.send(task)
  })
  .put(async (req: Request, res: Response) => {
    const id = req.params.id
    const newTask = await Tasks.findByIdAndUpdate(id, { ...req.body }, { new: true })
    res.send(newTask)
  })
  .delete(async (req: Request, res: Response) => {
    await Tasks.findByIdAndDelete(req.params.id)
    res.redirect("/tasks/")
  })

router
  .route("/add")
  .get((req: Request, res: Response) => {
    res.render("tasks/add", { tasks: [{ name: "First Task" }] })
  })
  .post(async (req: Request, res: Response) => {
    const { name, description } = req.body

    // Creating a new task using a type
    const newTaskData: TaskType = {
      id: uuidv4(),
      name,
      description,
      done: false,
    }

    const newTask = new Tasks(newTaskData)
    await newTask.save()
    res.redirect("/tasks/")
  })

router.post("/clean", async (req: Request, res: Response) => {
  await Tasks.deleteMany()
  res.redirect("/tasks/")
})

export default router
