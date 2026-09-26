import express from "express";
import { getCustomersController, getCustomerByIdController, updateCustomerStatusController } from "../controller/customers.controller.js";
import { auth } from "../middleware/auth.js";
const customersRoutes = express.Router();
customersRoutes.get("/customers", auth, getCustomersController);
customersRoutes.get("/customers/:id", auth, getCustomerByIdController);
customersRoutes.patch("/customers/:id/status", auth, updateCustomerStatusController);
export default customersRoutes;
//# sourceMappingURL=customer.routes.js.map