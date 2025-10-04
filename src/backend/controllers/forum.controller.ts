import { Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth.middleware';
import { generateUniqueSlug } from '../utils/slug';

export const createTopic = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content, category, tags } = req.body;
    const authorId = req.user.id;

    const slug = await generateUniqueSlug(title, prisma.forumTopic);

    const topic = await prisma.forumTopic.create({
      data: {
        title,
        slug,
        content,
        category,
        tags: tags || [],
        authorId,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });

    res.status(201).json({ topic });
  } catch (error) {
    console.error('Create topic error:', error);
    res.status(500).json({ error: 'Failed to create topic' });
  }
};

export const getTopics = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const category = req.query.category as string;
    const limit = 20;

    const where: any = {};
    if (category) {
      where.category = category;
    }

    const topics = await prisma.forumTopic.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            replies: true,
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
    });

    res.json({ topics });
  } catch (error) {
    console.error('Get topics error:', error);
    res.status(500).json({ error: 'Failed to get topics' });
  }
};

export const getTopicBySlug = async (req: AuthRequest, res: Response) => {
  try {
    const { slug } = req.params;

    const topic = await prisma.forumTopic.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            replies: true,
          },
        },
      },
    });

    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }

    await prisma.forumTopic.update({
      where: { id: topic.id },
      data: { views: { increment: 1 } },
    });

    res.json({ topic });
  } catch (error) {
    console.error('Get topic error:', error);
    res.status(500).json({ error: 'Failed to get topic' });
  }
};

export const replyToTopic = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const authorId = req.user.id;

    const reply = await prisma.forumReply.create({
      data: {
        content,
        topicId: id,
        authorId,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });

    res.status(201).json({ reply });
  } catch (error) {
    console.error('Reply to topic error:', error);
    res.status(500).json({ error: 'Failed to reply' });
  }
};

export const getReplies = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = 20;

    const replies = await prisma.forumReply.findMany({
      where: { topicId: id },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'asc' },
    });

    res.json({ replies });
  } catch (error) {
    console.error('Get replies error:', error);
    res.status(500).json({ error: 'Failed to get replies' });
  }
};
