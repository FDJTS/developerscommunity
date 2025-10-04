import { Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth.middleware';

export const createSnippet = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, code, language, tags, isPublic, projectId } = req.body;
    const authorId = req.user.id;

    const snippet = await prisma.codeSnippet.create({
      data: {
        title,
        description,
        code,
        language,
        tags: tags || [],
        isPublic: isPublic !== undefined ? isPublic : true,
        projectId: projectId || null,
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

    res.status(201).json({ snippet });
  } catch (error) {
    console.error('Create snippet error:', error);
    res.status(500).json({ error: 'Failed to create snippet' });
  }
};

export const getSnippets = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const language = req.query.language as string;
    const limit = 20;

    const where: any = { isPublic: true };
    if (language) {
      where.language = language;
    }

    const snippets = await prisma.codeSnippet.findMany({
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
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    res.json({ snippets });
  } catch (error) {
    console.error('Get snippets error:', error);
    res.status(500).json({ error: 'Failed to get snippets' });
  }
};

export const getSnippetById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const snippet = await prisma.codeSnippet.findUnique({
      where: { id },
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
        project: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    if (!snippet) {
      return res.status(404).json({ error: 'Snippet not found' });
    }

    if (!snippet.isPublic && req.user?.id !== snippet.authorId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    res.json({ snippet });
  } catch (error) {
    console.error('Get snippet error:', error);
    res.status(500).json({ error: 'Failed to get snippet' });
  }
};

export const forkSnippet = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const original = await prisma.codeSnippet.findUnique({
      where: { id },
    });

    if (!original) {
      return res.status(404).json({ error: 'Snippet not found' });
    }

    const forked = await prisma.codeSnippet.create({
      data: {
        title: `${original.title} (fork)`,
        description: original.description,
        code: original.code,
        language: original.language,
        tags: original.tags,
        isPublic: true,
        forkedFrom: id,
        authorId: userId,
      },
    });

    await prisma.codeSnippet.update({
      where: { id },
      data: { forkCount: { increment: 1 } },
    });

    res.status(201).json({ snippet: forked });
  } catch (error) {
    console.error('Fork snippet error:', error);
    res.status(500).json({ error: 'Failed to fork snippet' });
  }
};

export const updateSnippet = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const userId = req.user.id;

    const snippet = await prisma.codeSnippet.findUnique({
      where: { id },
    });

    if (!snippet) {
      return res.status(404).json({ error: 'Snippet not found' });
    }

    if (snippet.authorId !== userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const updated = await prisma.codeSnippet.update({
      where: { id },
      data: updates,
    });

    res.json({ snippet: updated });
  } catch (error) {
    console.error('Update snippet error:', error);
    res.status(500).json({ error: 'Failed to update snippet' });
  }
};

export const deleteSnippet = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const snippet = await prisma.codeSnippet.findUnique({
      where: { id },
    });

    if (!snippet) {
      return res.status(404).json({ error: 'Snippet not found' });
    }

    if (snippet.authorId !== userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await prisma.codeSnippet.delete({ where: { id } });

    res.json({ message: 'Snippet deleted' });
  } catch (error) {
    console.error('Delete snippet error:', error);
    res.status(500).json({ error: 'Failed to delete snippet' });
  }
};
