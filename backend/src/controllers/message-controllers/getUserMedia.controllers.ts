import type { Request, Response } from 'express';
import { prisma } from '../../lib/prisma.js';

export const getUserMedia = async (req: Request, res: Response) => {
    const othersId = req.params.userId as string;
    const currentUser = req.user;

    if (!currentUser) {
        return res.status(401).json({ error: 'Unauthorized!' });
    }

    const conversation = await prisma.conversation.findFirst({
        where: {
            OR: [
                { senderId: currentUser.id, receiverId: othersId },
                { senderId: othersId, receiverId: currentUser.id },
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
