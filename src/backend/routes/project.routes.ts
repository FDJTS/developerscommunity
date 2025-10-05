import { Router } from 'express';
import { authenticate, optionalAuth } from '../middleware/auth.middleware';
import {
  createProject,
  getProjects,
  getProjectBySlug,
  updateProject,
  deleteProject,
  addMember,
  removeMember,
} from '../controllers/project.controller';

const router = Router();

router.post('/', authenticate, createProject);
router.get('/', optionalAuth, getProjects);
router.get('/:slug', optionalAuth, getProjectBySlug);
router.put('/:id', authenticate, updateProject);
router.delete('/:id', authenticate, deleteProject);
router.post('/:id/members', authenticate, addMember);
router.delete('/:id/members/:userId', authenticate, removeMember);

export default router;
