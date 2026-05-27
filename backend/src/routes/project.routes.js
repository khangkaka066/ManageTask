import { Router } from 'express';
import { createProject, deleteProject, getProjectById, getProjects, updateProject } from '../controllers/project.controller.js';
import { validate } from '../middleware.js';
import { projectSchema } from '../validators/schemas.js';

const router = Router();
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', validate(projectSchema), createProject);
router.put('/:id', validate(projectSchema), updateProject);
router.delete('/:id', deleteProject);
export default router;
