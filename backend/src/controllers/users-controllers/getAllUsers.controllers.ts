import type { Request, Response } from 'express';
import { prisma } from '../../lib/prisma.js';

export const getAllUsers = async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized!' });
  }

  const users = await prisma.user.findMany({
    where: { NOT: { id: userId } },
    omit: {
      password: true,
    },
  });

  if (!users) {
    res.status(500).json({ error: 'An error occoured!' });
  }
  return res.status(200).json({
    success: true,
    data: users,
  });
};
