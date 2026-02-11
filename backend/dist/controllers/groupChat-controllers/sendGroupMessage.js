import { prisma } from '../../lib/prisma.js';
import { uploadImageToCloudinary } from '../../helper/uploadImageToCloudinary.js';
import { io } from '../../server.js';
export const sendGroupMessage = async (req, res) => {
    const groupId = req.params.groupId;
    const { text } = req.body || {};
    const imageFile = req.file;
    const currentUser = req.user;
    if (!text && !imageFile) {
        return res
            .status(400)
            .json({ error: 'Group Message cannot be empty!' });
    }
    if (!currentUser) {
        return res.status(401).json({ error: 'Unauthorized!' });
    }
    if (!groupId) {
        return res.status(400).json({ error: 'Group id is required!' });
    }
    const isGroupExist = await prisma.group.findUnique({
        where: { id: groupId },
        include: { members: true, messages: true },
    });
    if (!isGroupExist) {
        return res.status(404).json({ error: 'Group not found' });
    }
    const isUserInThisGroup = isGroupExist.members.find((m) => m.id === currentUser.id);
    if (!isUserInThisGroup) {
        return res.status(403).json({
            error: 'You are not allow to send message in this group!',
        });
    }
    // MESSAGES
    const messages = { text: '', image: '' };
    if (text || text?.trim().length > 0) {
        messages.text = text;
    }
    if (imageFile) {
        const { secure_url } = await uploadImageToCloudinary(imageFile.buffer);
        messages.image = secure_url;
    }
    // CREATE GROUP MESSAGE
    const newGroupMessage = await prisma.message.create({
        data: {
            senderId: currentUser.id,
            text: messages.text,
            image: messages.image,
            groupId: groupId,
        },
        include: { sender: { omit: { password: true } } },
    });
    if (!newGroupMessage) {
        return res.json({ error: 'Something went wrong - please try again!' });
    }
    // EMIT SOCKET EVENT TO GROUP MEMBERS
    io.to(isGroupExist.id).emit('newGroupMessage', newGroupMessage);
    return res.json(newGroupMessage);
};
//# sourceMappingURL=sendGroupMessage.js.map