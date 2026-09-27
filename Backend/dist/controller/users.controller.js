import { getUsersService, getUserProfileService, updateUserProfileService, createUserAddressService, deleteUserAddressService } from "../services/users.servies.js";
import { createUserAddressSchema, updateUserProfileSchema } from "../zod/UserZod.js";
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
        const email = typeof req.query.email === "string" ? req.query.email.trim() : undefined;
        const users = await getUsersService(email);
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
export async function getUserProfileController(req, res) {
    try {
        if (!req.auth) {
            res.status(401).json({
                message: "Unauthorized",
            });
            return;
        }
        if (req.auth.type !== "CUSTOMER") {
            res.status(403).json({
                message: "Customer access required",
            });
            return;
        }
        const user = await getUserProfileService(req.auth.id);
        if (!user) {
            res.status(404).json({
                message: "User not found",
            });
            return;
        }
        res.status(200).json({
            message: "Profile fetched successfully",
            data: user,
        });
    }
    catch (error) {
        console.error("GET USER PROFILE ERROR:", error);
        res.status(500).json({
            message: "Failed to fetch profile",
        });
    }
}
export async function updateUserProfileController(req, res) {
    try {
        if (!req.auth) {
            res.status(401).json({
                message: "Unauthorized",
            });
            return;
        }
        if (req.auth.type !== "CUSTOMER") {
            res.status(403).json({
                message: "Customer access required",
            });
            return;
        }
        const result = updateUserProfileSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                message: "Invalid request",
                errors: result.error.flatten(),
            });
            return;
        }
        const user = await updateUserProfileService(req.auth.id, result.data);
        if (!user) {
            res.status(404).json({
                message: "User not found",
            });
            return;
        }
        res.status(200).json({
            message: "Profile updated successfully",
            data: user,
        });
    }
    catch (error) {
        console.error("UPDATE USER PROFILE ERROR:", error);
        res.status(500).json({
            message: "Failed to update profile",
        });
    }
}
export async function createUserAddressController(req, res) {
    try {
        if (!req.auth) {
            res.status(401).json({
                message: "Unauthorized",
            });
            return;
        }
        if (req.auth.type !== "CUSTOMER") {
            res.status(403).json({
                message: "Customer access required",
            });
            return;
        }
        const result = createUserAddressSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                message: "Invalid request",
                errors: result.error.flatten(),
            });
            return;
        }
        const address = await createUserAddressService(req.auth.id, result.data);
        res.status(201).json({
            message: "Address added successfully",
            data: address,
        });
    }
    catch (error) {
        console.error("CREATE USER ADDRESS ERROR:", error);
        res.status(500).json({
            message: "Failed to add address",
        });
    }
}
export async function deleteUserAddressController(req, res) {
    try {
        if (!req.auth) {
            res.status(401).json({
                message: "Unauthorized",
            });
            return;
        }
        if (req.auth.type !== "CUSTOMER") {
            res.status(403).json({
                message: "Customer access required",
            });
            return;
        }
        const addressId = Number(req.params.addressId);
        if (!Number.isInteger(addressId) || addressId <= 0) {
            res.status(400).json({
                message: "Invalid address id",
            });
            return;
        }
        const deletedAddress = await deleteUserAddressService(req.auth.id, addressId);
        if (!deletedAddress) {
            res.status(404).json({
                message: "Address not found",
            });
            return;
        }
        res.status(200).json({
            message: "Address deleted successfully",
            data: deletedAddress,
        });
    }
    catch (error) {
        console.error("DELETE USER ADDRESS ERROR:", error);
        res.status(500).json({
            message: "Failed to delete address",
        });
    }
}
//# sourceMappingURL=users.controller.js.map