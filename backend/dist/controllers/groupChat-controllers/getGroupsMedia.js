import { prisma } from '../../lib/prisma.js';
export const getGroupsMedia = async (req, res) => {
    const groupId = req.params.groupId;
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
//# sourceMappingURL=getGroupsMedia.js.map