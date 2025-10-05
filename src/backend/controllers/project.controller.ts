import { Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth.middleware';
import { generateUniqueSlug } from '../utils/slug';

export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, readme, coverImage, githubRepo, liveUrl, tags, isPrivate, isOpenSource } = req.body;
    const ownerId = req.user.id;

    const slug = await generateUniqueSlug(name, prisma.project);

    const project = await prisma.project.create({
      data: {
        name,
        slug,
        description,
        readme,
        coverImage,
        githubRepo,
        liveUrl,
        tags: tags || [],
        isPrivate: isPrivate || false,
        isOpenSource: isOpenSource !== undefined ? isOpenSource : true,
        ownerId,
      },
      include: {
        owner: {
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

    res.status(201).json({ project });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
};

export const getProjects = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 20;
    const tag = req.query.tag as string;

    const where: any = { isPrivate: false };
    if (tag) {
      where.tags = { has: tag };
    }

    const projects = await prisma.project.findMany({
      where,
      include: {
        owner: {
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
            members: true,
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    res.json({ projects });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Failed to get projects' });
  }
};

export const getProjectBySlug = async (req: AuthRequest, res: Response) => {
  try {
    const { slug } = req.params;

    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        owner: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (project.isPrivate && req.user?.id !== project.ownerId) {
      const isMember = project.members.some(m => m.userId === req.user?.id);
      if (!isMember) {
        return res.status(403).json({ error: 'Not authorized' });
      }
    }

    res.json({ project });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Failed to get project' });
  }
};

export const updateProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const userId = req.user.id;

    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (existingProject.ownerId !== userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    if (updates.name && updates.name !== existingProject.name) {
      updates.slug = await generateUniqueSlug(updates.name, prisma.project, id);
    }

    const project = await prisma.project.update({
      where: { id },
      data: updates,
    });

    res.json({ project });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (project.ownerId !== userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await prisma.project.delete({ where: { id } });

    res.json({ message: 'Project deleted' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
};

export const addMember = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.body;
    const ownerId = req.user.id;

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (project.ownerId !== ownerId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const member = await prisma.projectMember.create({
      data: {
        userId,
        projectId: id,
        role: role || 'member',
      },
    });

    res.json({ member });
  } catch (error) {
    console.error('Add member error:', error);
    res.status(500).json({ error: 'Failed to add member' });
  }
};

export const removeMember = async (req: AuthRequest, res: Response) => {
  try {
    const { id, userId } = req.params;
    const ownerId = req.user.id;

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (project.ownerId !== ownerId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await prisma.projectMember.deleteMany({
      where: {
        userId,
        projectId: id,
      },
    });

    res.json({ message: 'Member removed' });
  } catch (error) {
    console.error('Remove member error:', error);
    res.status(500).json({ error: 'Failed to remove member' });
  }
};
