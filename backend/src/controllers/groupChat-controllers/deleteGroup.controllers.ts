import type { Request, Response } from 'express';
import { prisma } from '../../lib/prisma.ts';

export const deleteGroup = async (req: Request, res: Response) => {
    const groupId = req.params.groupId as string;
    const currentUser = req.user;

    const isGroupExist = await prisma.group.findUnique({
        where: { id: groupId },
    });

    if (!isGroupExist) {
        return res.status(404).json({ error: 'Group not found!' });
    }

    if (!isGroupExist.groupAdminId === currentUser.id) {
        return res.status(400).json({ error: 'Access denied!' });
    }

    try {
        await prisma.group.delete({
            where: { id: isGroupExist.id },
        });
        return res.status(200).json({ success: 'Group deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to delete group' });
    }
};
