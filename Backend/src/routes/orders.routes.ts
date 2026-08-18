import  Express  from "express";
import {createOrderController} from "../controller/orders.controller.js"

const ordersRoutes = Express.Router();

ordersRoutes.post("/api/orders",createOrderController)

export default ordersRoutes;