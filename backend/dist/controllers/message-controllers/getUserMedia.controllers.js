import { prisma } from '../../lib/prisma.js';
export const getUserMedia = async (req, res) => {
    const othersId = req.params.userId;
    const currentUser = req.user;
    if (!currentUser) {
        return res.status(401).json({ error: 'Unauthorized!' });
    }
    const conversation = await prisma.conversation.findFirst({
        where: {
            OR: [
                { senderId: currentUser.id, receiverId: othersId },
                { senderId: othersId, receiverId: currentUser.id },
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