import jwt from 'jsonwebtoken';
interface GenarateTokenType {
    id: string;
    email: string;
    clerkId?: string;
}
export declare const GenarateJwtToken: (data: GenarateTokenType) => Promise<string>;
export declare const VerifyJwtToken: (token: string) => Promise<string | jwt.JwtPayload>;
export {};
//# sourceMappingURL=JwtHelper.d.ts.map