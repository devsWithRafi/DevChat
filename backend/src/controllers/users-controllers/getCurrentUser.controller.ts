import type { Request, Response } from 'express';
import { prisma } from '../../lib/prisma.ts';

export const getCurrentUser = async (req: Request, res: Response) => {
    const currentUser = req.user;

    const users = await prisma.user.findUnique({
        where: { id: currentUser.id },
        omit: { password: true },
    });

    if (!users) {
        res.status(500).json({ error: 'An error occoured!' });
    }

    return res.json(users);
};
