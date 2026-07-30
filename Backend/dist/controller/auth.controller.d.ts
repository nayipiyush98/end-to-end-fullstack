import type { Request, Response } from "express";
export declare function UserRegister(req: Request, res: Response): Promise<void>;
export declare function AdminRegister(req: Request, res: Response): Promise<void>;
export declare function AdminLogin(req: Request, res: Response): Promise<void>;
export declare function UserLogin(req: Request, res: Response): Promise<void>;
export declare function UserRefreshToken(req: Request, res: Response): Promise<void>;
export declare function UserLogOut(req: Request, res: Response): Promise<void>;
export declare function UserProfile(req: Request, res: Response): Promise<void>;
export declare function UserForgetPassword(req: Request, res: Response): Promise<void>;
export declare function UserResetPassword(req: Request, res: Response): Promise<void>;
export declare function UserChangePassword(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map