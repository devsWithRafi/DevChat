import type { Request, Response } from 'express';
import { uploadImageToCloudinary } from '../../helper/uploadImageToCloudinary.js';
import { prisma } from '../../lib/prisma.js';

export const editUserInfo = async (req: Request, res: Response) => {
  const authUserId = req.userId;
  const { name, bio } = req.body || {};
  const avaterFile = req.file;

  if (!name || !bio) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'All profile info feilds are required!',
      });
  }

  if (!authUserId) {
    return res.status(401).json({ success: false, message: 'Unauthorized!' });
  }

  const updatedData: { [key: string]: string } = { name, bio };

  const currentUser = await prisma.user.findUnique({
    where: { id: authUserId },
  });

  if (!currentUser) {
    return res
      .status(401)
      .json({ success: false, message: 'An Error Occurred!' });
  }

  if (avaterFile) {
    const { secure_url, public_id } = await uploadImageToCloudinary(
      avaterFile.buffer,
      currentUser?.avatar_public_id || undefined,
    );
    updatedData.avater = secure_url;
    updatedData.avater_public_id = public_id;
  }

  await prisma.user.update({
    where: { id: currentUser.id },
    data: updatedData,
  });

  return res
    .status(200)
    .json({ success: true, message: 'Profile updated successful!' });
};
