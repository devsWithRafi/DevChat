import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/ENV.ts';

interface GenarateTokenType {
    id: string;
    email: string;
    clerkId?: string;
}

export const GenarateJwtToken = async (data: GenarateTokenType) => {
    const Token = await jwt.sign(data, JWT_SECRET, { expiresIn: '10d' });
    return Token;
};

export const VerifyJwtToken = async (token: string) => {
    const decoded = await jwt.verify(token, JWT_SECRET);
    return decoded;
};
