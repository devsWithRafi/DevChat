import type { Request, Response } from 'express';

// LOGOUT USER
export const logOutUser = async (req: Request, res: Response) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
    });
    return res.status(200).json({ success: 'Logged out successfully' });
};
