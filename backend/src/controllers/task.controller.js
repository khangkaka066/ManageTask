import { Task } from '../models/task.model.js';

const buildFilter = (query) => {
  const filter = {};
  ['project', 'assignee', 'status', 'priority'].forEach((k) => {
    if (query[k]) filter[k] = query[k];
  });
  return filter;
};

export const createTask = async (req, res) => res.status(201).json(await Task.create(req.validatedBody));

export const getTasks = async (req, res) => {
  const tasks = await Task.find(buildFilter(req.query))
    .populate('project', 'name')
    .populate('assignee', 'name email role')
    .sort({ dueDate: 1, createdAt: -1 });
  res.json(tasks);
};

export const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id).populate('project assignee');
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
};
export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.validatedBody, { new: true }).populate('project assignee');
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
};
export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
};
