import mongoose from 'mongoose';
import { PROJECT_STATUS } from '../utils/enums.js';

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    status: { type: String, enum: PROJECT_STATUS, default: 'Planning' },
    deadline: { type: Date },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }]
  },
  { timestamps: true }
);

export const Project = mongoose.model('Project', projectSchema);
