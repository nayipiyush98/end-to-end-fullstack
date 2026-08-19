import { z } from "zod";

export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.number().int().positive(),
        qty: z.number().int().positive(),
      })
    )
    .min(1, "Order must contain at least one product"),

  shippingAddress: z
    .string()
    .min(5, "Shipping address is required"),

  paymentMethod: z
    .string()
    .min(1, "Payment method is required"),
});

export type CreateOrderInput = z.infer<
  typeof createOrderSchema
>;



export const getOrdersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(100)
    .default(10),

  status: z.string().optional(),

  userId: z.coerce
    .number()
    .int()
    .positive()
    .optional(),
});

export type GetOrdersQuery = z.infer<
  typeof getOrdersQuerySchema
>;