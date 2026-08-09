import type { Request, Response, NextFunction } from "express";
export declare function authorize(permission: string): (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=authorize.d.ts.map