import { prisma } from '../../lib/prisma.js';
export const getAllUsers = async (req, res) => {
    const currentUser = req.user;
    if (!currentUser) {
        return res.status(401).json({ error: 'Unauthorized!' });
    }
    const users = await prisma.user.findMany({
        where: { NOT: { id: currentUser.id } },
        omit: {
            password: true,
        },
    });
    if (!users) {
        res.status(500).json({ error: 'An error occoured!' });
    }
    return res.json(users);
};
//# sourceMappingURL=getAllUsers.controllers.js.map