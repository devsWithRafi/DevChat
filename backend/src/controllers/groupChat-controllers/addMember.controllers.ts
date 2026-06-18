import type { Request, Response } from 'express';
import { prisma } from '../../lib/prisma.js';

export const addMemberToGroup = async (req: Request, res: Response) => {
  const groupId = req.params.groupId as string;
  const authUserId = req.userId;

  if (!groupId) {
    return res
      .status(400)
      .json({ success: false, message: 'Group ID is required.' });
  }
  if (!authUserId) {
    return res.status(401).json({ success: false, message: 'Unauthorized!' });
  }

  const findGroup = await prisma.group.findUnique({ where: { id: groupId } });

  if (!findGroup) {
    return res
      .status(404)
      .json({ success: false, message: 'Group not found!' });
  }

  const updateGroup = await prisma.group.update({
    where: { id: findGroup.id },
    data: {
      members: {
        connect: {
          id: authUserId,
        },
      },
    },
  });

  if (updateGroup) {
    return res
      .status(200)
      .json({
        success: true,
        message: 'You have successfully joined the group',
      });
  }

  return res
    .status(500)
    .json({ success: false, message: 'Failed to join the group!' });
};
