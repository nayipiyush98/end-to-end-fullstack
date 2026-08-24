import { z } from "zod";


export const orderProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.string(),
  images: z.array(z.string()),
});



export const orderItemSchema = z.object({
  id: z.number(),
  orderId: z.number(),
  productId: z.number(),
  qty: z.number(),
  price: z.string(),

  product: orderProductSchema,
});



export const orderUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});



export const orderSchema = z.object({
  id: z.number(),

  userId: z.number(),

  total: z.string(),

  shippingAddress: z.string(),

  paymentMethod: z.string(),

  status: z.enum([
    "PENDING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ]),

  cancelReason: z.string().nullable(),

  cancelledAt: z.string().nullable(),

  createdAt: z.string(),

  updatedAt: z.string(),

  items: z.array(orderItemSchema),

  user: orderUserSchema,
});



export const orderPaginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
  hasPreviousPage: z.boolean(),
  hasNextPage: z.boolean(),
});


export const ordersResponseSchema = z.object({
  message: z.string(),

  data: z.array(orderSchema),

  pagination: orderPaginationSchema,
});



export type OrderProduct = z.infer<
  typeof orderProductSchema
>;

export type OrderItem = z.infer<
  typeof orderItemSchema
>;

export type OrderUser = z.infer<
  typeof orderUserSchema
>;

export type Order = z.infer<
  typeof orderSchema
>;



export type OrdersResponse = z.infer<
  typeof ordersResponseSchema
>;




export type OrderPagination = z.infer<
  typeof orderPaginationSchema
>;

export const orderResponseSchema = z.object({
  message: z.string(),
  data: orderSchema,
});