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

export async function cancelOrder(
  id: number,
  reason: string
): Promise<void> {
  await api.post<unknown>(
    `/orders/${id}/cancel`,
    { reason }
  );
}

export async function downloadInvoice(
  id: number
): Promise<Blob> {
  const response = await api.get<Blob>(
    `/orders/${id}/invoice`,
    {
      responseType: "blob",
    }
  );

  return response;
}

export interface CreateAdminOrderInput {
  userId: number;

  items: {
    productId: number;
    qty: number;
  }[];

  shippingAddress: string;

  paymentMethod: string;
}

export async function createAdminOrder(
  data: CreateAdminOrderInput
): Promise<Order> {
  const response = await api.post<unknown>(
    "/orders/admin",
    data
  );

  const parsed =
    orderResponseSchema.parse(response);

  return parsed.data;
}