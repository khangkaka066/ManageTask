import { Project } from '../models/project.model.js';
import { Task } from '../models/task.model.js';

const withProgress = async (project) => {
  const total = await Task.countDocuments({ project: project._id });
  const done = await Task.countDocuments({ project: project._id, status: 'Done' });
  return { ...project.toObject(), progress: total ? Math.round((done / total) * 100) : 0 };
};

export const createProject = async (req, res) => res.status(201).json(await Project.create(req.validatedBody));

export const getProjects = async (_req, res) => {
  const projects = await Project.find().populate('members').sort({ createdAt: -1 });
  const mapped = await Promise.all(projects.map(withProgress));
  res.json(mapped);
};

export const getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id).populate('members');
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(await withProgress(project));
};

export const updateProject = async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.validatedBody, { new: true }).populate('members');
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(await withProgress(project));
};

export const deleteProject = async (req, res) => {
  await Task.deleteMany({ project: req.params.id });
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Project deleted' });
};
