import { create } from "zustand";

import {
    cancelOrder,
    createAdminOrder,
    getOrderById,
  getOrders,
  updateOrderStatus,
  type CreateAdminOrderInput,
} from "@/api/order.api";

import type {
  Order,
  OrderPagination,
} from "@/zod/order.schema";

interface OrderState {
  orders: Order[];

  pagination: OrderPagination;

  isLoading: boolean;

  error: string | null;

  page: number;

  limit: number;

  status: string;

  fetchOrders: () => Promise<void>;

  setPage: (page: number) => void;

  setStatus: (status: string) => void;

  setLimit: (limit: number) => void;

  clearError: () => void;

  order: Order | null;

fetchOrderById: (id: number) => Promise<void>;

updateOrderStatus: (
  id: number,
  status: string
) => Promise<void>;

cancelOrder: (
  id: number,
  reason: string
) => Promise<void>;

createAdminOrder: (
  data: CreateAdminOrderInput
) => Promise<Order>;
}

export const useOrderStore = create<OrderState>(
  (set, get) => ({
    orders: [],

    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    },

    isLoading: false,

    error: null,

    page: 1,

    limit: 10,

    status: "",



    fetchOrders: async () => {
      try {
        set({
          isLoading: true,
          error: null,
        });

        const {
          page,
          limit,
          status,
        } = get();

        const response = await getOrders(
          page,
          limit,
          status || undefined
        );

        set({
          orders: response.data,

          pagination: response.pagination,
        });
      } catch (error) {
        console.error(
          "FETCH ORDERS ERROR:",
          error
        );

        set({
          error:
            error instanceof Error
              ? error.message
              : "Failed to fetch orders",
        });
      } finally {
        set({
          isLoading: false,
        });
      }
    },

    updateOrderStatus: async (id, status) => {
  try {
    set({
      isLoading: true,
      error: null,
    });

    const updatedOrder = await updateOrderStatus(
      id,
      status
    );
    await get().fetchOrders();
    set({
      order: updatedOrder,
    });
  } catch (error) {
    console.error(
      "UPDATE ORDER STATUS ERROR:",
      error
    );

    set({
      error:
        error instanceof Error
          ? error.message
          : "Failed to update order status",
    });

    throw error;
  } finally {
    set({
      isLoading: false,
    });
  }
},

cancelOrder: async (id, reason) => {
  try {
    set({
      isLoading: true,
      error: null,
    });

    await cancelOrder(id, reason);

    await get().fetchOrders();
  } catch (error) {
    console.error(
      "CANCEL ORDER ERROR:",
      error
    );

    set({
      error:
        error instanceof Error
          ? error.message
          : "Failed to cancel order",
    });

    throw error;
  } finally {
    set({
      isLoading: false,
    });
  }
},

createAdminOrder: async (data) => {
  try {
    set({
      isLoading: true,
      error: null,
    });

    const order =
      await createAdminOrder(data);

    set((state) => ({
      orders: [
        order,
        ...state.orders,
      ],
    }));

    return order;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to create order";

    set({
      error: message,
    });

    throw error;
  } finally {
    set({
      isLoading: false,
    });
  }
},

    fetchOrderById: async (id) => {
  try {
    set({
      isLoading: true,
      error: null,
      order: null,
    });

    const order = await getOrderById(id);

    set({
      order,
    });
  } catch (error) {
    console.error(
      "FETCH ORDER ERROR:",
      error
    );

    set({
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch order",
    });
  } finally {
    set({
      isLoading: false,
    });
  }
},



    setPage: (page) => {
      set({ page });
    },



    setStatus: (status) => {
      set({
        status,
        page: 1,
      });
    },


    setLimit: (limit) => {
      set({
        limit,
        page: 1,
      });
    },



    clearError: () => {
      set({
        error: null,
      });
    },
  })
);