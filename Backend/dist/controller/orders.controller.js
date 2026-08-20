import { required } from "zod/mini";
import { cancelOrderService, createOrderService, getOrderByIdService, getOrdersService, updateOrderStatusService } from "../services/order.service.js";
import { cancelOrderSchema, createOrderSchema, getOrdersQuerySchema, updateOrderStatusSchema } from "../zod/orderZod.js";
export async function createOrderController(req, res) {
    try {
        if (!req.user) {
            res.status(401).json({
                message: "Authentication required",
            });
            return;
        }
        const userId = req.user.id;
        const data = createOrderSchema.parse(req.body);
        const order = await createOrderService(userId, data);
        res.status(201).json({
            message: "Order created successfully",
            data: order,
        });
        return;
    }
    catch (error) {
        console.error("CREATE ORDER ERROR:", error);
        if (error instanceof Error) {
            res.status(400).json({
                message: error.message,
            });
            return;
        }
        res.status(500).json({
            message: "Failed to create order",
        });
        return;
    }
}
export async function getOrdersController(req, res) {
    try {
        if (!req.auth) {
            res.status(401).json({
                message: "Authentication required",
            });
            return;
        }
        const query = getOrdersQuerySchema.parse(req.query);
        const result = await getOrdersService(req.auth.id, req.auth.type, query);
        res.status(200).json({
            message: "Orders fetched successfully",
            data: result.orders,
            pagination: result.pagination,
        });
        return;
    }
    catch (error) {
        console.error("GET ORDERS ERROR:", error);
        if (error instanceof Error) {
            res.status(400).json({
                message: error.message,
            });
            return;
        }
        res.status(500).json({
            message: "Failed to fetch orders",
        });
    }
}
export async function getOrderByIdController(req, res) {
    try {
        if (!req.auth) {
            res.status(401).json({
                message: "Authentication required",
            });
            return;
        }
        const orderId = Number(req.params.id);
        if (!Number.isInteger(orderId) || orderId <= 0) {
            res.status(400).json({
                message: "Invalid order ID",
            });
            return;
        }
        const order = await getOrderByIdService(orderId, req.auth.id, req.auth.type);
        res.status(200).json({
            message: "Order fetched successfully",
            data: order,
        });
        return;
    }
    catch (error) {
        console.error("GET ORDER ERROR:", error);
        if (error instanceof Error &&
            error.message === "Order not found") {
            res.status(404).json({
                message: "Order not found",
            });
            return;
        }
        res.status(500).json({
            message: "Failed to fetch order",
        });
        return;
    }
}
export async function updateOrderStatusController(req, res) {
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
        const orderId = Number(req.params.id);
        if (!Number.isInteger(orderId) || orderId <= 0) {
            res.status(400).json({
                message: "Invalid order ID",
            });
            return;
        }
        const data = updateOrderStatusSchema.parse(req.body);
        const order = await updateOrderStatusService(orderId, data);
        res.status(200).json({
            message: "Order status updated successfully",
            data: order,
        });
        return;
    }
    catch (error) {
        console.error("UPDATE ORDER STATUS ERROR:", error);
        if (error instanceof Error) {
            if (error.message === "Order not found") {
                res.status(404).json({
                    message: error.message,
                });
                return;
            }
            if (error.message.startsWith("Order is already")) {
                res.status(409).json({
                    message: error.message,
                });
                return;
            }
            res.status(400).json({
                message: error.message,
            });
            return;
        }
        res.status(500).json({
            message: "Failed to update order status",
        });
    }
}
export async function cancelOrderController(req, res) {
    try {
        if (!req.auth) {
            res.status(401).json({
                message: "Authentication required"
            });
            return;
        }
        const orderId = Number(req.params.id);
        if (!Number.isInteger(orderId) || orderId <= 0) {
            res.status(400).json({
                message: "orderId is invalid"
            });
            return;
        }
        const data = cancelOrderSchema.parse(req.body);
        const order = await cancelOrderService(orderId, req.auth.id, req.auth.type, data);
        res.status(200).json({
            message: "order cancelled successfully",
            data: order
        });
    }
    catch (error) {
        console.error("CANCEL ORDER ERROR:", error);
        if (error instanceof Error) {
            if (error.message === "Order not found") {
                res.status(404).json({
                    message: error.message,
                });
                return;
            }
            if (error.message ===
                "Order is already cancelled") {
                res.status(409).json({
                    message: error.message,
                });
                return;
            }
            if (error.message.includes("only cancel an order")) {
                res.status(409).json({
                    message: error.message,
                });
                return;
            }
            res.status(400).json({
                message: error.message,
            });
            return;
        }
        res.status(500).json({
            message: "Failed to cancel order",
        });
    }
}
//# sourceMappingURL=orders.controller.js.map