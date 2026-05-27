import { Router } from 'express';
import { createMember, deleteMember, getMemberById, getMembers, updateMember } from '../controllers/member.controller.js';
import { validate } from '../middleware.js';
import { memberSchema } from '../validators/schemas.js';

const router = Router();
router.get('/', getMembers);
router.get('/:id', getMemberById);
router.post('/', validate(memberSchema), createMember);
router.put('/:id', validate(memberSchema), updateMember);
router.delete('/:id', deleteMember);
export default router;
