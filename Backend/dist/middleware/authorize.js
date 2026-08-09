import { prisma } from "../config/db.js";
import { findByIdRole } from "../models/role.model.js";
export function authorize(permission) {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                res.status(401).json({
                    message: "Unauthorized",
                });
                return;
            }
            if (!req.user.roleId) {
                res.status(403).json({
                    message: "No role assigned",
                });
                return;
            }
            const role = await findByIdRole({
                where: {
                    id: req.user.roleId,
                },
                include: {
                    rolePermissions: {
                        include: {
                            permission: true,
                        },
                    },
                },
            });
            if (!role) {
                res.status(403).json({
                    message: "Role not found",
                });
                return;
            }
            const permissions = role.rolePermissions.map((rp) => rp.permission.name);
            if (!permissions.includes(permission)) {
                res.status(403).json({
                    message: "Permission denied",
                });
                return;
            }
            next();
        }
        catch (error) {
            res.status(500).json({
                message: error instanceof Error
                    ? error.message
                    : "Something went wrong",
            });
        }
    };
}
//# sourceMappingURL=authorize.js.map