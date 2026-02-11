import { prisma } from '../lib/prisma.js';
export const JoinSocketGroup = async (socket, currentUserId, groupId) => {
    const group = await prisma.group.findUnique({
        where: { id: groupId },
        include: { members: { omit: { password: true } } },
    });
    if (!group)
        return;
    const isUserInThisGroup = group.members.find((member) => member.id === currentUserId);
    if (!isUserInThisGroup)
        return;
    if (socket.rooms.has(groupId))
        return;
    socket.join(groupId);
};
//# sourceMappingURL=joinGroup.js.map