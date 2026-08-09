import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import type { AdminUser, User } from "../generated/prisma/client.js";

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

export function generateAdminAccessToken(
  payload: AdminAccessTokenPayload
) {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "15m",
  });
}

interface AdminRefreshTokenPayload {
  id: number;
}

export function generateAdminRefreshToken(
  payload: AdminRefreshTokenPayload
): string {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });
}


interface UserAccessTokenPayload {
  id: number;
  email: string;
}

interface UserRefreshTokenPayload {
  id: number;
}

export function generateUserAccessToken(
  payload: UserAccessTokenPayload
): string {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "15m",
  });
}

export function generateUserRefreshToken(
  payload: UserRefreshTokenPayload
): string {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });
}


export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};


interface RefreshTokenPayload {
  id: number;
}

export function verifyUserRefreshToken(token: string): number {
  const decoded = jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET!
  ) as RefreshTokenPayload;

  return decoded.id;
}

export function verifyAdminRefreshToken(token: string): number {
  const decoded = jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET!
  ) as RefreshTokenPayload;

  return decoded.id;
}


export function verifyAccessTokenAndGetUser(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      message: "Access token required",
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    if (!token) {
      res.status(401).json({
        message: "Invalid access token",
      });
      return;
    }

    const decoded = verifyAccessToken(token) as User;

    req.user = decoded;

    next();
  } catch {
    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}
