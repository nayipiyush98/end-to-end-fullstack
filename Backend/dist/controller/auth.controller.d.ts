import type { Request, Response } from "express";
export declare function userRegister(req: Request, res: Response): Promise<void>;
export declare function adminRegister(req: Request, res: Response): Promise<void>;
export declare function adminLogin(req: Request, res: Response): Promise<void>;
export declare function userLogin(req: Request, res: Response): Promise<void>;
export declare function userRefreshToken(req: Request, res: Response): Promise<void>;
export declare function userLogOut(req: Request, res: Response): Promise<void>;
export declare function userProfile(req: Request, res: Response): Promise<void>;
export declare function userForgetPassword(req: Request, res: Response): Promise<void>;
export declare function userResetPassword(req: Request, res: Response): Promise<void>;
export declare function userChangePassword(req: Request, res: Response): Promise<void>;
export declare function adminMe(req: Request, res: Response): Promise<void>;
export declare function adminRefreshToken(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map