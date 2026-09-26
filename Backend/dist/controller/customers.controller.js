import { getCustomersService, getCustomerByIdService, updateCustomerStatusService } from "../services/customers.services.js";
import { updateCustomerStatusSchema } from "../zod/customerZod.js";
export async function getCustomersController(req, res) {
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
        const page = typeof req.query.page === "string"
            ? Number(req.query.page)
            : 1;
        const limit = typeof req.query.limit === "string"
            ? Number(req.query.limit)
            : 10;
        const search = typeof req.query.search === "string"
            ? req.query.search.trim()
            : undefined;
        const result = await getCustomersService(page, limit, search);
        res.status(200).json({
            message: "Customers fetched successfully",
            data: result,
        });
    }
    catch (error) {
        console.error("GET CUSTOMERS ERROR:", error);
        res.status(500).json({
            message: "Failed to fetch customers",
        });
    }
}
export async function getCustomerByIdController(req, res) {
    try {
        if (!req.auth) {
            res.status(401).json({
                message: "Unauthorized",
            });
            return;
        }
        if (req.auth.type !== "ADMIN") {
            res.status(403).json({
                message: "Admin access required",
            });
            return;
        }
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            res.status(400).json({
                message: "Invalid customer id",
            });
            return;
        }
        const customer = await getCustomerByIdService(id);
        if (!customer) {
            res.status(404).json({
                message: "Customer not found",
            });
            return;
        }
        res.status(200).json({
            message: "Customer fetched successfully",
            data: customer,
        });
    }
    catch (error) {
        console.error("GET CUSTOMER BY ID ERROR:", error);
        res.status(500).json({
            message: "Failed to fetch customer",
        });
    }
}
export async function updateCustomerStatusController(req, res) {
    try {
        if (!req.auth) {
            res.status(401).json({
                message: "Unauthorized",
            });
            return;
        }
        if (req.auth.type !== "ADMIN") {
            res.status(403).json({
                message: "Admin access required",
            });
            return;
        }
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            res.status(400).json({
                message: "Invalid customer id",
            });
            return;
        }
        const result = updateCustomerStatusSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                message: "Invalid request",
                errors: result.error.flatten(),
            });
            return;
        }
        const customer = await updateCustomerStatusService(id, result.data.isActive);
        if (!customer) {
            res.status(404).json({
                message: "Customer not found",
            });
            return;
        }
        res.status(200).json({
            message: result.data.isActive
                ? "Customer unblocked successfully"
                : "Customer blocked successfully",
            data: customer,
        });
    }
    catch (error) {
        console.error("UPDATE CUSTOMER STATUS ERROR:", error);
        res.status(500).json({
            message: "Failed to update customer status",
        });
    }
}
//# sourceMappingURL=customers.controller.js.map