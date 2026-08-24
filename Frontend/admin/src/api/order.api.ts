import { api } from "@/api/axios";

import {
    orderResponseSchema,
  ordersResponseSchema,
  type Order,
  type OrdersResponse,
} from "@/zod/order.schema";

export async function getOrders(
  page = 1,
  limit = 10,
  status?: string
): Promise<OrdersResponse> {
  const response = await api.get<unknown>(
    "/orders",
    {
      params: {
        page,
        limit,
        ...(status
          ? { status }
          : {}),
      },
    }
  );

  return ordersResponseSchema.parse(
    response
  );
}

export async function getOrderById(
  id: number
): Promise<Order> {
  const response = await api.get<unknown>(
    `/orders/${id}`
  );

  const parsed = orderResponseSchema.parse(response);

  return parsed.data;
}

export async function updateOrderStatus(
  id: number,
  status: string
): Promise<Order> {
  const response = await api.patch<unknown>(
    `/orders/${id}/status`,
    { status }
  );

  const parsed = orderResponseSchema.parse(response);

  return parsed.data;
}