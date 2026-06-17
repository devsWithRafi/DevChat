import { prisma } from '../../lib/prisma.js';
export const leaveGroup = async (req, res) => {
    const groupId = req.params.groupId;
    const authUserId = req.userId;
    if (!groupId) {
        return res.status(400).json({ error: 'Group ID is required' });
    }
    if (!authUserId) {
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
                    id: authUserId,
                },
            },
        },
    });
    if (updateGroup) {
        return res
            .status(200)
            .json({ success: 'You have successfully left the group' });
    }
    return res.status(500).json({ success: 'Failed to leave the group!' });
};
//# sourceMappingURL=leaveGroup.controllers.js.map