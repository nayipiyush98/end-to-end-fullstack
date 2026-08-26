import { create } from "zustand";

import {
  getCustomers,
  type Customer,
} from "@/api/user.api";

interface UserState {
  users: Customer[];

  isLoading: boolean;

  error: string | null;

  fetchUsers: () => Promise<void>;

  clearError: () => void;
}

export const useUserStore = create<UserState>(
  (set) => ({
    users: [],

    isLoading: false,

    error: null,

    fetchUsers: async () => {
      try {
        set({
          isLoading: true,
          error: null,
        });

        const users = await getCustomers();

        set({
          users,
        });
      } catch (error) {
        console.error(
          "FETCH USERS ERROR:",
          error
        );

        set({
          error:
            error instanceof Error
              ? error.message
              : "Failed to fetch users",
        });
      } finally {
        set({
          isLoading: false,
        });
      }
    },

    clearError: () => {
      set({
        error: null,
      });
    },
  })
);