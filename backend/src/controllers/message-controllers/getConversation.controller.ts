import type { Request, Response } from 'express';
import { prisma } from '../../lib/prisma.ts';

export const getConversations = async (req: Request, res: Response) => {
    const currentUser = req.user;
    const othersId = req.params.othersId as string;

    const conversation = await prisma.conversation.findFirst({
        where: {
            OR: [
                { senderId: currentUser.id, receiverId: othersId },
                { senderId: othersId, receiverId: currentUser.id },
            ],
        },
        include: {
            messages: true,
            sender: { omit: { password: true } },
            receiver: { omit: { password: true } },
        },
    });

    return res.status(200).json(conversation ?? null);
};
