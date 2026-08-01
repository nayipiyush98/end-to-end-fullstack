import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import type { User } from "../generated/prisma/client.js";
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email: string;
                role?: string;
            };
        }
    }
}
export declare const generateAccessToken: (data: User) => string;
export declare const verifyAccessToken: (token: string) => string | jwt.JwtPayload;
export declare function verifyAccessTokenAndGetUser(req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=jwt.d.ts.map