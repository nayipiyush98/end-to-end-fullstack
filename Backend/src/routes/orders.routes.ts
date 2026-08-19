import  Express  from "express";
import {createOrderController, getOrdersController} from "../controller/orders.controller.js"
import { userAuth } from "../middleware/userAuth.js";
import { auth } from "../middleware/auth.js";

const ordersRoutes = Express.Router();

ordersRoutes.post("/api/orders",userAuth,createOrderController)
ordersRoutes.get("/api/orders",auth,getOrdersController)

export default ordersRoutes;