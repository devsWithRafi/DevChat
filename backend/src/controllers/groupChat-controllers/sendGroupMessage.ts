import type { Request, Response } from 'express';
import { prisma } from '../../lib/prisma.ts';
import { uploadImageToCloudinary } from '../../helper/uploadImageToCloudinary.ts';
import { io } from '../../server.ts';

export const sendGroupMessage = async (req: Request, res: Response) => {
    const groupId = req.params.groupId as string;
    const { text } = req.body || {};
    const imageFile = req.file;
    const currentUser = req.user;

    if (!text && !imageFile) {
        return res
            .status(400)
            .json({ error: 'Group Message cannot be empty!' });
    }

    if (!groupId) {
        return res.status(400).json({ error: 'Group id is required!' });
    }

    const isGroupExist = await prisma.group.findUnique({
        where: { id: groupId },
        include: { members: true, messages: true },
    });

    if (!isGroupExist) {
        return res.status(404).json({ error: 'Group not found' });
    }

    const isUserInThisGroup = isGroupExist.members.find(
        (m) => m.id === currentUser.id,
    );

    if (!isUserInThisGroup) {
        return res.status(403).json({
            error: 'You are not allow to send message in this group!',
        });
    }

    // MESSAGES
    const messages = { text: '', image: '' };

    if (text || text?.trim().length > 0) {
        messages.text = text;
    }
    if (imageFile) {
        const { secure_url } = await uploadImageToCloudinary(imageFile.buffer);
        messages.image = secure_url;
    }

    // CREATE GROUP MESSAGE
    const newGroupMessage = await prisma.message.create({
        data: {
            senderId: currentUser.id,
            text: messages.text,
            image: messages.image,
            groupId: groupId,
        },
        include: { sender: { omit: { password: true } } },
    });

    if (!newGroupMessage) {
        return res.json({ error: 'Something went wrong - please try again!' });
    }

    // EMIT SOCKET EVENT TO GROUP MEMBERS
    io.to(isGroupExist.id).emit('newGroupMessage', newGroupMessage);

    return res.json(newGroupMessage);
};
