import { Member } from '../models/member.model.js';
import { Task } from '../models/task.model.js';

export const createMember = async (req, res) => {
  const member = await Member.create(req.validatedBody);
  res.status(201).json(member);
};
export const getMembers = async (_req, res) => res.json(await Member.find().sort({ createdAt: -1 }));
export const getMemberById = async (req, res) => {
  const member = await Member.findById(req.params.id);
  if (!member) return res.status(404).json({ message: 'Member not found' });
  const tasks = await Task.find({ assignee: req.params.id }).populate('project', 'name');
  res.json({ member, tasks });
};
export const updateMember = async (req, res) => {
  const member = await Member.findByIdAndUpdate(req.params.id, req.validatedBody, { new: true });
  if (!member) return res.status(404).json({ message: 'Member not found' });
  res.json(member);
};
export const deleteMember = async (req, res) => {
  await Member.findByIdAndDelete(req.params.id);
  await Task.updateMany({ assignee: req.params.id }, { $unset: { assignee: 1 } });
  res.json({ message: 'Member deleted' });
};
