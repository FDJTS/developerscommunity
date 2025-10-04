import { Router } from 'express';
import { authenticate, optionalAuth } from '../middleware/auth.middleware';
import {
  createTopic,
  getTopics,
  getTopicBySlug,
  replyToTopic,
  getReplies,
} from '../controllers/forum.controller';

const router = Router();

router.post('/topics', authenticate, createTopic);
router.get('/topics', optionalAuth, getTopics);
router.get('/topics/:slug', optionalAuth, getTopicBySlug);
router.post('/topics/:id/reply', authenticate, replyToTopic);
router.get('/topics/:id/replies', getReplies);

export default router;
