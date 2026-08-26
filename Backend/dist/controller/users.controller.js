import { getUsersService } from "../services/users.servies.js";
export async function getUsersController(req, res) {
    try {
        if (!req.auth) {
            res.status(401).json({
                message: "Authentication required",
            });
            return;
        }
        if (req.auth.type !== "ADMIN") {
            res.status(403).json({
                message: "Admin access required",
            });
            return;
        }
        const users = await getUsersService();
        res.status(200).json({
            message: "Users fetched successfully",
            data: users,
        });
    }
    catch (error) {
        console.error("GET USERS ERROR:", error);
        res.status(500).json({
            message: "Failed to fetch users",
        });
    }
}
//# sourceMappingURL=users.controller.js.map