import { Router } from 'express';
import { authenticate, optionalAuth } from '../middleware/auth.middleware';
import {
  getUserProfile,
  updateProfile,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  sendFriendRequest,
  acceptFriendRequest,
  getFriends,
  searchUsers,
} from '../controllers/user.controller';

const router = Router();

router.get('/search', searchUsers);
router.get('/:username', optionalAuth, getUserProfile);
router.put('/profile', authenticate, updateProfile);
router.post('/:userId/follow', authenticate, followUser);
router.delete('/:userId/unfollow', authenticate, unfollowUser);
router.get('/:userId/followers', getFollowers);
router.get('/:userId/following', getFollowing);
router.post('/:userId/friend-request', authenticate, sendFriendRequest);
router.post('/friend-request/:requestId/accept', authenticate, acceptFriendRequest);
router.get('/friends', authenticate, getFriends);

export default router;
