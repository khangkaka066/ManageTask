import { z } from 'zod';
import { PROJECT_STATUS, TASK_PRIORITY, TASK_STATUS } from '../utils/enums.js';

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/);

export const memberSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.string().min(2)
});

export const projectSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional().default(''),
  status: z.enum(PROJECT_STATUS).optional(),
  deadline: z.string().datetime().optional(),
  members: z.array(objectId).optional().default([])
});

export const taskSchema = z.object({
  project: objectId,
  title: z.string().min(2),
  description: z.string().optional().default(''),
  assignee: objectId.optional(),
  status: z.enum(TASK_STATUS).optional(),
  priority: z.enum(TASK_PRIORITY).optional(),
  dueDate: z.string().datetime().optional()
});
