import { uploadImageToCloudinary } from '../../helper/uploadImageToCloudinary.js';
import { prisma } from '../../lib/prisma.js';
export const editUserInfo = async (req, res) => {
    const authUser = req.user;
    const { name, bio } = req.body || {};
    const avaterFile = req.file;
    if (!name || !bio) {
        return res
            .status(400)
            .json({ error: 'All profile info feilds are required!' });
    }
    if (!authUser) {
        return res.status(401).json({ error: 'Unauthorized!' });
    }
    const updatedData = { name, bio };
    const currentUser = await prisma.user.findUnique({
        where: { id: authUser.id },
    });
    if (!currentUser) {
        return res.status(400).json({ error: 'An Error Occurred!' });
    }
    if (avaterFile) {
        const { secure_url, public_id } = await uploadImageToCloudinary(avaterFile.buffer, currentUser?.avater_public_id || undefined);
        updatedData.avater = secure_url;
        updatedData.avater_public_id = public_id;
    }
    await prisma.user.update({
        where: { id: currentUser.id },
        data: updatedData,
    });
    return res.status(200).json({ success: 'Profile updated successful!' });
};
//# sourceMappingURL=editUserInfo.controllers.js.map