import type { Response,Request,NextFunction } from "express";
import { verifyAccessToken } from "./verifyToken.js";
import { findAdminById } from "../models/adminUser.model.js";


interface AdminAccessTokenPayload {
  id: number;
  email: string;
  roleId: number | null;
}

export async function adminAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
    try{
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        message: "Access token required",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({
            message: "Access token required",
        });
        return;
    }

    const decoded = verifyAccessToken(
      token
    ) as AdminAccessTokenPayload;

     const admin = await findAdminById({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        email: true,
        roleId: true,
      },
    });

    if (!admin) {
      res.status(401).json({
        message: "Admin not found",
      });
      return;
    }

    req.user = {
      id: admin.id,
      email: admin.email,
      roleId: admin.roleId,
    };

    next();
    }catch(error){
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}