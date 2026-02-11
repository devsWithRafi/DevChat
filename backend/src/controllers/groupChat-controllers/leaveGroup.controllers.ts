import type { Request, Response } from 'express';
import { prisma } from '../../lib/prisma.js';

export const leaveGroup = async (req: Request, res: Response) => {
    const groupId = req.params.groupId as string;
    const currentUser = req.user;

    if (!groupId) {
        return res.status(400).json({ error: 'Group ID is required' });
    }
    if (!currentUser) {
        return res.status(401).json({ error: 'Unauthorized!' });
    }

    const findGroup = await prisma.group.findUnique({ where: { id: groupId } });

    if (!findGroup) {
        return res.status(404).json({ error: 'Group not found!' });
    }

    const updateGroup = await prisma.group.update({
        where: { id: findGroup.id },
        data: {
            members: {
                disconnect: {
                    id: currentUser.id,
                },
            },
        },
    });

    if (updateGroup) {
        return res.status(200).json({ success: 'You have successfully left the group' });
    }

    return res.status(500).json({ success: 'Failed to leave the group!' });
};
