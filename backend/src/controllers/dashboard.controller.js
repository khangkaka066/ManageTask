import { Project } from '../models/project.model.js';
import { Task } from '../models/task.model.js';

export const getDashboard = async (_req, res) => {
  const [totalProjects, totalTasks, inProgressTasks, completedTasks] = await Promise.all([
    Project.countDocuments(),
    Task.countDocuments(),
    Task.countDocuments({ status: 'In Progress' }),
    Task.countDocuments({ status: 'Done' })
  ]);
  const now = new Date();
  const overdueTasks = await Task.countDocuments({ dueDate: { $lt: now }, status: { $ne: 'Done' } });
  const nearDeadline = await Task.find({ dueDate: { $gte: now }, status: { $ne: 'Done' } })
    .sort({ dueDate: 1 })
    .limit(8)
    .populate('project', 'name')
    .populate('assignee', 'name');
  res.json({ totalProjects, totalTasks, inProgressTasks, completedTasks, overdueTasks, nearDeadline });
};
