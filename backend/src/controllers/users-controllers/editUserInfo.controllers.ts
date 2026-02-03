import type { Request, Response } from 'express';
import { uploadImageToCloudinary } from '../../helper/uploadImageToCloudinary.ts';
import { prisma } from '../../lib/prisma.ts';

export const editUserInfo = async (req: Request, res: Response) => {
    const authUser = req.user;
    const { name, bio } = req.body || {};
    const avaterFile = req.file;

    if (!name || !bio) {
        return res
            .status(400)
            .json({ error: 'All profile info feilds are required!' });
    }

    const updatedData: { [key: string]: string } = { name, bio };

    const currentUser = await prisma.user.findUnique({
        where: { id: authUser.id },
    });

    if (!currentUser) {
        return res.status(400).json({ error: 'An Error Occurred!' });
    }

    if (avaterFile) {
        const { secure_url, public_id } = await uploadImageToCloudinary(
            avaterFile.buffer,
            currentUser?.avater_public_id || undefined,
        );
        updatedData.avater = secure_url;
        updatedData.avater_public_id = public_id;
    }

    await prisma.user.update({
        where: { id: currentUser.id },
        data: updatedData,
    });

    return res.status(200).json({ success: 'Profile updated successful!' });
};
