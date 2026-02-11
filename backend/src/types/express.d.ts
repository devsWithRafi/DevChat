import type { AuthUserType } from './AuthUser.js';

declare global {
    namespace Express {
        interface Request {
            user?: AuthUserType;
        }
    }
}
