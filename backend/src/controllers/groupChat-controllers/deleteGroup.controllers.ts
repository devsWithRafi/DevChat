import type { Request, Response } from 'express';
import { prisma } from '../../lib/prisma.js';

export const deleteGroup = async (req: Request, res: Response) => {
  const groupId = req.params.groupId as string;
  const authUserId = req.userId;

  if (!authUserId) {
    return res.status(401).json({ success: false, message: 'Unauthorized!' });
  }

  const isGroupExist = await prisma.group.findUnique({
    where: { id: groupId },
  });

  if (!isGroupExist) {
    return res
      .status(404)
      .json({ success: false, message: 'Group not found!' });
  }

  if (isGroupExist.groupAdminId !== authUserId) {
    return res.status(400).json({ success: false, message: 'Access denied!' });
  }

  try {
    await prisma.group.delete({
      where: { id: isGroupExist.id },
    });
    return res
      .status(200)
      .json({ success: true, message: 'Group deleted successfully' });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Failed to delete group' });
  }
};
