import { Router } from 'express';
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from '../controllers/task.controller.js';
import { validate } from '../middleware.js';
import { taskSchema } from '../validators/schemas.js';

const router = Router();
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', validate(taskSchema), createTask);
router.put('/:id', validate(taskSchema), updateTask);
router.delete('/:id', deleteTask);
export default router;
