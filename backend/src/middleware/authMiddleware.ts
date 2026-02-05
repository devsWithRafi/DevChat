import type { NextFunction, Request, Response } from 'express';
import { VerifyJwtToken } from '../helper/JwtHelper.ts';

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const decoded = await VerifyJwtToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Auth error:', error);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};
