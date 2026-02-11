import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/ENV.js';
export const GenarateJwtToken = async (data) => {
    const Token = await jwt.sign(data, JWT_SECRET, { expiresIn: '10d' });
    return Token;
};
export const VerifyJwtToken = async (token) => {
    const decoded = await jwt.verify(token, JWT_SECRET);
    return decoded;
};
//# sourceMappingURL=JwtHelper.js.map