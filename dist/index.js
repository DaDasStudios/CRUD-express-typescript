"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const express_handlebars_1 = require("express-handlebars");
const method_override_1 = __importDefault(require("method-override"));
const mongoose_1 = __importDefault(require("mongoose"));
// ? Routers
const index_1 = __importDefault(require("./routes/index"));
const tasks_1 = __importDefault(require("./routes/tasks"));
// * Initializating server and DB
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../', '.env') });
const app = (0, express_1.default)();
mongoose_1.default.
    connect('mongodb+srv://cluster0.idejg.mongodb.net/typescript-express-app', { user: process.env.DB_USER, pass: process.env.DB_PASS })
    .then(db => {
    console.log("DB connected");
})
    .catch(err => {
    console.log(err);
});
// * Configurations
app.set('port', 3000 || process.env.PORT);
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('.hbs', (0, express_handlebars_1.engine)({
    extname: 'hbs',
    partialsDir: path_1.default.join(app.get('views'), 'partials'),
    layoutsDir: path_1.default.join(app.get('views'), 'layouts'),
    runtimeOptions: { allowProtoPropertiesByDefault: true }
}));
// * Middlewares
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, method_override_1.default)());
// * Global Variables
// app.use((req: Request, res: Response, next: NextFunction) => {
//     req.body.tasks = [...req.body.tasks]
//     next()
// })
// * Routes
app.use('/', index_1.default);
app.use('/tasks', tasks_1.default);
// * Public
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// * 404 Hanlder
app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
});
// * Server
app.listen(app.get('port'), () => {
    console.log("Serving on port", app.get('port'));
});
