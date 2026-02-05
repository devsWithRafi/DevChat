import type { Request, Response } from 'express';
import { prisma } from '../../lib/prisma.ts';

export const getGroupsMedia = async (req: Request, res: Response) => {
    const groupId = req.params.groupId as string;

    const groupMedia = await prisma.group.findUnique({
        where: { id: groupId },
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

    return res.status(200).json(groupMedia);
};
