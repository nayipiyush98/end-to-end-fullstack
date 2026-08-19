import { verifyAccessToken } from "./verifyToken.js";
import { prisma } from "../config/db.js";
export async function auth(req, res, next) {
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
        if (typeof decoded !== "object" ||
            decoded === null ||
            !("id" in decoded) ||
            !("email" in decoded)) {
            res.status(401).json({
                message: "Invalid access token",
            });
            return;
        }
        const id = Number(decoded.id);
        const email = String(decoded.email);
        // Check AdminUser first
        const admin = await prisma.adminUser.findUnique({
            where: {
                id,
            },
        });
        if (admin && admin.email === email) {
            req.auth = {
                id: admin.id,
                email: admin.email,
                type: "ADMIN",
            };
            next();
            return;
        }
        // Check normal User
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (user && user.email === email) {
            req.auth = {
                id: user.id,
                email: user.email,
                type: "CUSTOMER",
            };
            next();
            return;
        }
        res.status(401).json({
            message: "User not found",
        });
        return;
    }
    catch (error) {
        console.error("AUTH ERROR:", error);
        res.status(401).json({
            message: "Invalid or expired access token",
        });
        return;
    }
}
//# sourceMappingURL=auth.js.map