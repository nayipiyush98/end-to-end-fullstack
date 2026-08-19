import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "./verifyToken.js";

export async function userAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        message: "Authorization header is required",
      });
      return;
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      res.status(401).json({
        message: "Invalid authorization format",
      });
      return;
    }

    const decoded = verifyAccessToken(token);

    if (
      typeof decoded !== "object" ||
      decoded === null ||
      !("id" in decoded) ||
      !("email" in decoded)
    ) {
      res.status(401).json({
        message: "Invalid access token",
      });
      return;
    }

    req.user = {
      id: Number(decoded.id),
      email: String(decoded.email),
    };

    next();
  } catch (error) {
    console.error("USER AUTH ERROR:", error);

    res.status(401).json({
      message: "Invalid or expired access token",
    });

    return;
  }
}