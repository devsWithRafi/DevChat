import type { Request, Response } from 'express';
import { prisma } from '../../lib/prisma.js';

export const getUserMedia = async (req: Request, res: Response) => {
  const othersId = req.params.userId as string;
  const authUserId = req.userId;

  if (!authUserId) {
    return res.status(401).json({ success: false, message: 'Unauthorized!' });
  }

  const conversation = await prisma.conversation.findFirst({
    where: {
      OR: [
        { senderId: authUserId, receiverId: othersId },
        { senderId: othersId, receiverId: authUserId },
      ],
    },
    select: {
      messages: {
        where: {
          image: {
            not: '',
          },
        },
      },
    },
  });

  return res.status(200).json(conversation);
};
