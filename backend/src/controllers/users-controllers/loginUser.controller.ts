import type { Request, Response } from 'express';
import { prisma } from '../../lib/prisma.js';
import { ComparePassword } from '../../helper/BcryptHelper.js';
import { GenarateJwtToken } from '../../helper/JwtHelper.js';


// SIGN IN USER
export const logInUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All feilds are required!' });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(400).json({ error: 'User not found!' });
        }

        const isMached = await ComparePassword(password, user.password!);

        if (!isMached) {
            return res.status(400).json({ error: 'Sorry invalid password!' });
        }

        const token = await GenarateJwtToken({
            email: user.email,
            id: user.id,
        });
        res.cookie('token', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
        });

        return res.status(200).json({ success: 'User logged in successful!' });
    } catch (error) {
        console.log('User find error:', error);
    }
};