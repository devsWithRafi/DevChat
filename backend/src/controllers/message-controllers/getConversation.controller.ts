import type { Request, Response } from 'express';
import { prisma } from '../../lib/prisma.js';

export const getConversations = async (req: Request, res: Response) => {
  const authUserId = req.userId;
  const othersId = req.params.othersId as string;

  if (!authUserId) {
    return res.status(401).json({ error: 'Unauthorized!' });
  }

  const conversation = await prisma.conversation.findFirst({
    where: {
      OR: [
        { senderId: authUserId, receiverId: othersId },
        { senderId: othersId, receiverId: authUserId },
      ],
    },
    include: {
      messages: {
        include: {
          sender: { omit: { password: true } },
        },
      },
      sender: { omit: { password: true } },
      receiver: { omit: { password: true } },
    },
  });

  return res.status(200).json(conversation ?? null);
};
