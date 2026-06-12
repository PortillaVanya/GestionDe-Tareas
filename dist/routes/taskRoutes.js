"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const auth_1 = __importDefault(require("../middleware/auth"));
const validation_1 = __importDefault(require("../middleware/validation"));
const joi_1 = __importDefault(require("joi"));
const router = (0, express_1.Router)();
const taskSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().allow('', null),
    status: joi_1.default.string().valid('pending', 'in-progress', 'completed'),
});
const updateTaskSchema = joi_1.default.object({
    title: joi_1.default.string(),
    description: joi_1.default.string().allow('', null),
    status: joi_1.default.string().valid('pending', 'in-progress', 'completed'),
});
router.use(auth_1.default);
router.post('/', (0, validation_1.default)(taskSchema), taskController_1.createTask);
router.get('/', taskController_1.getTasks);
router.get('/:id', taskController_1.getTaskById);
router.put('/:id', (0, validation_1.default)(updateTaskSchema), taskController_1.updateTask);
router.delete('/:id', taskController_1.deleteTask);
exports.default = router;
//# sourceMappingURL=taskRoutes.js.map