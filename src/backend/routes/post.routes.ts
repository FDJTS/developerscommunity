import { Router } from 'express';
import { authenticate, optionalAuth } from '../middleware/auth.middleware';
import {
  createPost,
  getPosts,
  getPostBySlug,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  commentOnPost,
  getComments,
} from '../controllers/post.controller';

const router = Router();

router.post('/', authenticate, createPost);
router.get('/', optionalAuth, getPosts);
router.get('/:slug', optionalAuth, getPostBySlug);
router.put('/:id', authenticate, updatePost);
router.delete('/:id', authenticate, deletePost);
router.post('/:id/like', authenticate, likePost);
router.delete('/:id/unlike', authenticate, unlikePost);
router.post('/:id/comment', authenticate, commentOnPost);
router.get('/:id/comments', getComments);

export default router;
