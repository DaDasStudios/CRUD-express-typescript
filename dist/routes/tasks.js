"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const Task_1 = __importDefault(require("../models/Task"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    const tasks = await Task_1.default.find();
    res.render('tasks/index', { tasks });
});
router.route('/add')
    .get((req, res) => {
    res.render('tasks/add', { tasks: [{ name: "First Task" }] });
})
    .post(async (req, res) => {
    const { name, description } = req.body;
    // Creating a new task using a type
    const newTaskData = {
        id: (0, uuid_1.v4)(),
        name,
        description,
        done: false
    };
    const newTask = new Task_1.default(newTaskData);
    await newTask.save();
    res.redirect("/tasks/");
});
router.post('/clean', async (req, res) => {
    await Task_1.default.deleteMany();
    res.redirect('/tasks/');
});
exports.default = router;
