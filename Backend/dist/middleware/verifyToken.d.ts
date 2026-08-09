import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email: string;
                roleId?: number | null;
            };
        }
    }
}
interface AdminAccessTokenPayload {
    id: number;
    email: string;
    roleId: number | null;
}
export declare function generateAdminAccessToken(payload: AdminAccessTokenPayload): string;
interface AdminRefreshTokenPayload {
    id: number;
}
export declare function generateAdminRefreshToken(payload: AdminRefreshTokenPayload): string;
interface UserAccessTokenPayload {
    id: number;
    email: string;
}
interface UserRefreshTokenPayload {
    id: number;
}
export declare function generateUserAccessToken(payload: UserAccessTokenPayload): string;
export declare function generateUserRefreshToken(payload: UserRefreshTokenPayload): string;
export declare const verifyAccessToken: (token: string) => string | jwt.JwtPayload;
export declare function verifyUserRefreshToken(token: string): number;
export declare function verifyAdminRefreshToken(token: string): number;
export declare function verifyAccessTokenAndGetUser(req: Request, res: Response, next: NextFunction): void;
export {};
//# sourceMappingURL=verifyToken.d.ts.map