import { prisma } from '../../lib/prisma.js';
import { uploadImageToCloudinary } from '../../helper/uploadImageToCloudinary.js';
export const updateGroup = async (req, res) => {
    const groupId = req.params.groupId;
    const { name, membersIds, bio } = req.body || {};
    const groupAvaterFile = req.file;
    const currentUser = req.user;
    if (!name || !membersIds || membersIds.length < 2) {
        return res.status(400).json({ error: 'Invalid group data' });
    }
    if (!currentUser) {
        return res.status(401).json({ error: 'Unauthorized!' });
    }
    const validateMembers = await prisma.user.findMany({
        where: {
            id: { in: JSON.parse(membersIds) },
        },
    });
    const isGroupExist = await prisma.group.findUnique({
        where: { id: groupId },
    });
    if (!isGroupExist) {
        return res.status(404).json({ error: 'Group not found!' });
    }
    if (isGroupExist.groupAdminId !== currentUser.id) {
        return res.status(400).json({ error: 'Access denied!' });
    }
    const groupData = {
        name,
        groupAdminId: currentUser.id,
        members: {
            set: [
                ...validateMembers.map((m) => ({ id: m.id })),
                { id: currentUser.id }, // always include admin
            ],
        },
        bio,
    };
    if (groupAvaterFile) {
        const { secure_url, public_id } = await uploadImageToCloudinary(groupAvaterFile.buffer, isGroupExist.groupsAvater_public_id || undefined);
        groupData.groupsAvater = secure_url;
        groupData.groupsAvater_public_id = public_id;
    }
    try {
        await prisma.group.update({
            where: { id: isGroupExist.id },
            data: groupData,
        });
        return res.status(200).json({ success: 'Group updated successfully' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to update group' });
    }
};
//# sourceMappingURL=updateGroup.controllers.js.map