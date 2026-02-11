import { prisma } from '../../lib/prisma.js';
export const getConversations = async (req, res) => {
    const currentUser = req.user;
    const othersId = req.params.othersId;
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
        include: {
            messages: {
                include: {
                    sender: { omit: { password: true } },
                },
            },
            sender: { omit: { password: true } },
            receiver: { omit: { password: true } },
        },
    });
    return res.status(200).json(conversation ?? null);
};
//# sourceMappingURL=getConversation.controller.js.map