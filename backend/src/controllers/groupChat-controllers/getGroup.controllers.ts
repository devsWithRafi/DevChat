import type { Request, Response } from 'express';
import { prisma } from '../../lib/prisma.ts';

export const getGroup = async (req: Request, res: Response) => {
    const groups = await prisma.group.findMany({
        include: {
            admin: { omit: { password: true } },
            members: { omit: { password: true } },
            messages: { include: { sender: { omit: { password: true } } } },
        },
    });

    if (!groups || groups.length === 0) {
        return res.status(404).json({ error: 'No Groups not found' });
    }

    return res.status(200).json(groups);
};
