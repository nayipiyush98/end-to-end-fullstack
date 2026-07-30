import jwt from "jsonwebtoken";
export declare const generateAccessToken: (id: number, email: string, role?: string) => string;
export declare const generateRefreshToken: (id: number) => string;
export declare const verifyAccessToken: (token: string) => string | jwt.JwtPayload;
export declare const verifyRefreshToken: (token: string) => string | jwt.JwtPayload;
//# sourceMappingURL=jwt.d.ts.map