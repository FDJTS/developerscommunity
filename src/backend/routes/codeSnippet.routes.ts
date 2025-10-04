import { Router } from 'express';
import { authenticate, optionalAuth } from '../middleware/auth.middleware';
import {
  createSnippet,
  getSnippets,
  getSnippetById,
  forkSnippet,
  updateSnippet,
  deleteSnippet,
} from '../controllers/codeSnippet.controller';

const router = Router();

router.post('/', authenticate, createSnippet);
router.get('/', optionalAuth, getSnippets);
router.get('/:id', optionalAuth, getSnippetById);
router.post('/:id/fork', authenticate, forkSnippet);
router.put('/:id', authenticate, updateSnippet);
router.delete('/:id', authenticate, deleteSnippet);

export default router;
