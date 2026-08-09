import { verifyAccessToken } from "./verifyToken.js";
import { findAdminById } from "../models/adminUser.model.js";
export async function adminAuth(req, res, next) {
    try {
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
        const decoded = verifyAccessToken(token);
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
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}
//# sourceMappingURL=adminAuth.js.map