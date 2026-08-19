import { createOrderService, getOrdersService } from "../services/order.service.js";
import { createOrderSchema, getOrdersQuerySchema } from "../zod/orderZod.js";
import type { Request, Response } from "express";

export async function createOrderController(
  req: Request,
  res: Response,
): Promise<void> {
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
  } catch (error) {
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

export async function getOrdersController(
  req: Request,
  res: Response
): Promise<void> {
  try {
     if (!req.auth) {
      res.status(401).json({
        message: "Authentication required",
      });
      return;
    }


    const query = getOrdersQuerySchema.parse(req.query);

     const result = await getOrdersService(
      req.auth.id,
      req.auth.type,
      query
    );

    res.status(200).json({
      message: "Orders fetched successfully",
      data: result.orders,
      pagination: result.pagination,
    });

    return;
  } catch (error) {
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
