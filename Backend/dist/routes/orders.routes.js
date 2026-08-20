import Express from "express";
import { createOrderController, getOrdersController, getOrderByIdController, updateOrderStatusController, cancelOrderController } from "../controller/orders.controller.js";
import { userAuth } from "../middleware/userAuth.js";
import { auth } from "../middleware/auth.js";
import { adminAuth } from "../middleware/adminAuth.js";
const ordersRoutes = Express.Router();
ordersRoutes.post("/orders", userAuth, createOrderController);
ordersRoutes.get("/orders", auth, getOrdersController);
ordersRoutes.get("/orders/:id", auth, getOrderByIdController);
ordersRoutes.patch("/orders/:id/status", auth, updateOrderStatusController);
ordersRoutes.post("/orders/:id/cancel", auth, cancelOrderController);
export default ordersRoutes;
//# sourceMappingURL=orders.routes.js.map