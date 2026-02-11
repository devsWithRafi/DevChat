import { prisma } from '../../lib/prisma.js';
import { HashPassword } from '../../helper/BcryptHelper.js';
import { GenarateJwtToken } from '../../helper/JwtHelper.js';
// SIGN UP USER
export const signUpUser = async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ error: 'All feilds are required!' });
    }
    const isUserExist = await prisma.user.findUnique({ where: { email } });
    if (isUserExist) {
        return res.status(400).json({ error: 'User already exist!' });
    }
    try {
        const hassedPass = await HashPassword(password);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hassedPass,
            },
        });
        if (!user) {
            return res.status(400).json({ error: 'An error occurred!' });
        }
        const token = await GenarateJwtToken({
            email: user.email,
            id: user.id,
        });
        res.cookie('token', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
        });
        return res.status(200).json(user);
    }
    catch (error) {
        console.log('User creates failed', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
//# sourceMappingURL=signUpUser.controller.js.map