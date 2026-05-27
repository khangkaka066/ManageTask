import mongoose from 'mongoose';
import { TASK_PRIORITY, TASK_STATUS } from '../utils/enums.js';

const taskSchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
    status: { type: String, enum: TASK_STATUS, default: 'To Do' },
    priority: { type: String, enum: TASK_PRIORITY, default: 'Medium' },
    dueDate: { type: Date }
  },
  { timestamps: true }
);

export const Task = mongoose.model('Task', taskSchema);
