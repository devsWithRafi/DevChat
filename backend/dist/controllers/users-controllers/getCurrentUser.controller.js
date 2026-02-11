import { prisma } from '../../lib/prisma.js';
export const getCurrentUser = async (req, res) => {
    const currentUser = req.user;
    if (!currentUser) {
        return res.status(401).json({ error: 'Unauthorized!' });
    }
    const users = await prisma.user.findUnique({
        where: { id: currentUser.id },
        omit: { password: true },
    });
    if (!users) {
        return res.status(500).json({ error: 'An error occoured!' });
    }
    return res.json(users);
};
//# sourceMappingURL=getCurrentUser.controller.js.map