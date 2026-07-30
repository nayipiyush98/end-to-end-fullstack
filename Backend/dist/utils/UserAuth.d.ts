import type { Request, Response, NextFunction } from "express";
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
export declare function auth(req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=UserAuth.d.ts.map