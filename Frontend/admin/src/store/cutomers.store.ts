import { create } from "zustand";
import {
  getCustomers,
  type Customer,
  type CustomerPagination,
} from "@/api/customers.api";

interface CustomerState {
  customers: Customer[];
  pagination: CustomerPagination | null;

  isLoading: boolean;
  error: string | null;

  fetchCustomers: (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }) => Promise<void>;

  clearCustomers: () => void;
  clearError: () => void;
}

export const useCustomerStore = create<CustomerState>((set) => ({
  customers: [],
  pagination: null,

  isLoading: false,
  error: null,

  fetchCustomers: async (params = {}) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const response = await getCustomers(
        params.page ?? 1,
        params.limit ?? 10,
        params.search
      );

      set({
        customers: response.data.customers,
        pagination: response.data.pagination,
      });
    } catch (error) {
      console.error("FETCH CUSTOMERS ERROR:", error);

      set({
        customers: [],
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch customers",
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  clearCustomers: () =>
    set({
      customers: [],
      pagination: null,
    }),

  clearError: () =>
    set({
      error: null,
    }),
}));