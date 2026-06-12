"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getTasks = exports.createTask = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const createTask = async (req, res, next) => {
    try {
        const { title, description, status } = req.body;
        const task = await Task_1.default.create({
            title,
            description,
            status: status || 'pending',
            userId: req.user.id,
        });
        res.status(201).json(task);
    }
    catch (error) {
        next(error);
    }
};
exports.createTask = createTask;
const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task_1.default.findAll({ where: { userId: req.user.id } });
        res.status(200).json(tasks);
    }
    catch (error) {
        next(error);
    }
};
exports.getTasks = getTasks;
const getTaskById = async (req, res, next) => {
    try {
        const task = await Task_1.default.findOne({
            where: { id: req.params.id, userId: req.user.id },
        });
        if (!task) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        res.status(200).json(task);
    }
    catch (error) {
        next(error);
    }
};
exports.getTaskById = getTaskById;
const updateTask = async (req, res, next) => {
    try {
        const task = await Task_1.default.findOne({
            where: { id: req.params.id, userId: req.user.id },
        });
        if (!task) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        const { title, description, status } = req.body;
        if (title !== undefined)
            task.title = title;
        if (description !== undefined)
            task.description = description;
        if (status !== undefined)
            task.status = status;
        await task.save();
        res.status(200).json(task);
    }
    catch (error) {
        next(error);
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res, next) => {
    try {
        const task = await Task_1.default.findOne({
            where: { id: req.params.id, userId: req.user.id },
        });
        if (!task) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        await task.destroy();
        res.status(200).json({ message: 'Task deleted successfully' });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteTask = deleteTask;
//# sourceMappingURL=taskController.js.map