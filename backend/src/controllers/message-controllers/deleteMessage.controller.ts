import type { Request, Response } from 'express';
import { prisma } from '../../lib/prisma.ts';

export const deleteMessage = async (req: Request, res: Response) => {
    const msgId = req.params.msgId as string;
    if (!msgId) {
        return res
            .status(400)
            .json({ error: 'Message id is required for deleting message' });
    }

    const message = await prisma.message.findUnique({ where: { id: msgId } });

    if (!message) {
        return res
            .status(404)
            .json({ error: 'Sorry no message found on this message id' });
    }

    await prisma.message.delete({ where: { id: message.id } });

    return res.status(200).json({ success: 'Message delete successful!' });
};
