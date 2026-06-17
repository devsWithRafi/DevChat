import { prisma } from '../../lib/prisma.js';
export const getUserMedia = async (req, res) => {
    const othersId = req.params.userId;
    const authUserId = req.userId;
    if (!authUserId) {
        return res.status(401).json({ error: 'Unauthorized!' });
    }
    const conversation = await prisma.conversation.findFirst({
        where: {
            OR: [
                { senderId: authUserId, receiverId: othersId },
                { senderId: othersId, receiverId: authUserId },
            ],
        },
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
    return res.status(200).json(conversation);
};
//# sourceMappingURL=getUserMedia.controllers.js.map