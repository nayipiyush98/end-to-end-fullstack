import { create } from "zustand";

import {
  getOrders,
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