import { Server as SocketIOServer, Socket } from 'socket.io';
import { verifyToken } from '../utils/jwt';
import prisma from '../config/database';

interface SocketUser {
  userId: string;
  socketId: string;
}

const connectedUsers = new Map<string, SocketUser>();

export const setupSocketHandlers = (io: SocketIOServer) => {
  io.use(async (socket: Socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication required'));
      }

      const decoded = verifyToken(token);
      socket.data.userId = decoded.userId;
      next();
    } catch (error) {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', async (socket: Socket) => {
    const userId = socket.data.userId;
    console.log(`User connected: ${userId}`);

    // Store connected user
    connectedUsers.set(userId, { userId, socketId: socket.id });

    // Update user online status
    await prisma.user.update({
      where: { id: userId },
      data: { isOnline: true, lastSeen: new Date() },
    });

    // Join user's personal room
    socket.join(`user:${userId}`);

    // Notify friends about online status
    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [
          { userId, status: 'accepted' },
          { friendId: userId, status: 'accepted' },
        ],
      },
    });

    friendships.forEach((friendship) => {
      const friendId = friendship.userId === userId ? friendship.friendId : friendship.userId;
      io.to(`user:${friendId}`).emit('friend:online', { userId, isOnline: true });
    });

    // Handle real-time messaging
    socket.on('message:send', async (data) => {
      try {
        const { receiverId, content, conversationId } = data;

        const message = await prisma.message.create({
          data: {
            senderId: userId,
            receiverId,
            content,
            conversationId: conversationId || `${[userId, receiverId].sort().join('-')}`,
          },
          include: {
            sender: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
          },
        });

        // Send to receiver
        io.to(`user:${receiverId}`).emit('message:new', message);
        
        // Send confirmation to sender
        socket.emit('message:sent', message);

        // Create notification
        await prisma.notification.create({
          data: {
            userId: receiverId,
            type: 'message',
            content: `New message from ${message.sender.username}`,
            link: `/messages/${conversationId}`,
          },
        });

        io.to(`user:${receiverId}`).emit('notification:new', {
          type: 'message',
          content: `New message from ${message.sender.username}`,
        });
      } catch (error) {
        console.error('Message send error:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Handle typing indicators
    socket.on('typing:start', (data) => {
      const { receiverId } = data;
      io.to(`user:${receiverId}`).emit('typing:start', { userId });
    });

    socket.on('typing:stop', (data) => {
      const { receiverId } = data;
      io.to(`user:${receiverId}`).emit('typing:stop', { userId });
    });

    // Handle WebRTC signaling for voice/video calls
    socket.on('call:initiate', (data) => {
      const { receiverId, offer } = data;
      io.to(`user:${receiverId}`).emit('call:incoming', {
        callerId: userId,
        offer,
      });
    });

    socket.on('call:answer', (data) => {
      const { callerId, answer } = data;
      io.to(`user:${callerId}`).emit('call:answered', {
        receiverId: userId,
        answer,
      });
    });

    socket.on('call:ice-candidate', (data) => {
      const { receiverId, candidate } = data;
      io.to(`user:${receiverId}`).emit('call:ice-candidate', {
        senderId: userId,
        candidate,
      });
    });

    socket.on('call:reject', (data) => {
      const { callerId } = data;
      io.to(`user:${callerId}`).emit('call:rejected', {
        receiverId: userId,
      });
    });

    socket.on('call:end', (data) => {
      const { receiverId } = data;
      io.to(`user:${receiverId}`).emit('call:ended', {
        userId,
      });
    });

    // Handle disconnection
    socket.on('disconnect', async () => {
      console.log(`User disconnected: ${userId}`);
      connectedUsers.delete(userId);

      await prisma.user.update({
        where: { id: userId },
        data: { isOnline: false, lastSeen: new Date() },
      });

      // Notify friends about offline status
      friendships.forEach((friendship) => {
        const friendId = friendship.userId === userId ? friendship.friendId : friendship.userId;
        io.to(`user:${friendId}`).emit('friend:online', { userId, isOnline: false });
      });
    });
  });
};

export const getConnectedUsers = () => {
  return Array.from(connectedUsers.values());
};
