import { api } from "@/api/axios";

import {
  ordersResponseSchema,
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