import type { Request, Response } from 'express';
import { prisma } from '../../lib/prisma.js';

export const getCurrentUser = async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized!' });
  }

  const users = await prisma.user.findUnique({
    where: { id: userId },
    omit: { password: true },
  });

  if (!users) {
    return res
      .status(500)
      .json({ success: false, message: 'An error occoured!' });
  }

  return res.json(users);
};
