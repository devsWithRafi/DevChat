import type { Request, Response } from 'express';
import { prisma } from '../../lib/prisma.js';
import { uploadImageToCloudinary } from '../../helper/uploadImageToCloudinary.js';

export const createGroup = async (req: Request, res: Response) => {
  const { name, membersIds, bio } = req.body || {};
  const groupAvaterFile = req.file;
  const authUserId = req.userId;

  if (!authUserId) {
    return res.status(401).json({ success: false, message: 'Unauthorized!' });
  }

  if (!name || !membersIds || membersIds.length < 2) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid group data' });
  }

  const validateMembers = await prisma.user.findMany({
    where: {
      id: { in: JSON.parse(membersIds) },
    },
  });

  const groupData: any = {
    name,
    groupAdminId: authUserId,
    members: {
      connect: [
        ...validateMembers.map((m) => ({ id: m.id })),
        { id: authUserId },
      ],
    },
    bio,
  };
  if (groupAvaterFile) {
    const { secure_url, public_id } = await uploadImageToCloudinary(
      groupAvaterFile.buffer,
    );
    groupData.groupsAvater = secure_url;
    groupData.groupsAvater_public_id = public_id;
  }

  try {
    await prisma.group.create({ data: groupData });
    return res
      .status(200)
      .json({ success: true, message: 'Group created successfully' });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Failed to create group' });
  }
};
