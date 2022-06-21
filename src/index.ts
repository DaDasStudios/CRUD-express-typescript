import express, { Express, Response, Request, NextFunction } from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { engine } from 'express-handlebars'
import methodOverride from 'method-override'
import mongoose from 'mongoose'

// ? Routers
import mainRouter from './routes/index'
import tasksRouter from './routes/tasks'


// * Initializating server and DB
dotenv.config({ path: path.join(__dirname, '../', '.env') })
const app: Express = express()
mongoose.
    connect('mongodb+srv://cluster0.idejg.mongodb.net/typescript-express-app', { user: process.env.DB_USER, pass: process.env.DB_PASS })
    .then(db => {
        console.log("DB connected")
    })
    .catch(err => {
        console.log(err)
    })

// * Configurations
app.set('port', 3000 || process.env.PORT)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.engine('.hbs', engine({
    extname: 'hbs',
    partialsDir: path.join(app.get('views'), 'partials'),
    layoutsDir: path.join(app.get('views'), 'layouts'),
    runtimeOptions: {allowProtoPropertiesByDefault: true}
}))


// * Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride())


// * Global Variables
// app.use((req: Request, res: Response, next: NextFunction) => {
//     req.body.tasks = [...req.body.tasks]
//     next()
// })

// * Routes
app.use('/', mainRouter)
app.use('/tasks', tasksRouter)

// * Public
app.use(express.static(path.join(__dirname, 'public')))

// * 404 Hanlder
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('404 Not Found')
})

// * Server
app.listen(app.get('port'), () => {
    console.log("Serving on port", app.get('port'))
})