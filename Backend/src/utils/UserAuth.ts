import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.js";

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

export function auth(req: Request, res: Response, next: NextFunction): void {
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

    const decoded = verifyAccessToken(token) as {
      id: number;
      email: string;
      role?: string;
    };

    req.user = decoded;

    next();
  } catch {
    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}
