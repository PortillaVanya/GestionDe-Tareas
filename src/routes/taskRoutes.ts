import { Router } from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/taskController';
import auth from '../middleware/auth';
import validate from '../middleware/validation';
import Joi from 'joi';

const router = Router();

const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow('', null),
  status: Joi.string().valid('pending', 'in-progress', 'completed'),
});

const updateTaskSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().allow('', null),
  status: Joi.string().valid('pending', 'in-progress', 'completed'),
});

router.use(auth);

router.post('/', validate(taskSchema), createTask);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.put('/:id', validate(updateTaskSchema), updateTask);
router.delete('/:id', deleteTask);

export default router;
