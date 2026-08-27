import { create } from "zustand";

import {
  getUsers,
  type Customer,
} from "@/api/user.api";

interface UserState {
  users: Customer[];

  isLoading: boolean;

  error: string | null;

  searchUsers: (email: string) => Promise<void>;

  clearUsers: () => void;

  clearError: () => void;
}

export const useUserStore = create<UserState>(
  (set) => ({
    users: [],

    isLoading: false,

    error: null,

    searchUsers: async (email: string) => {
      try {
        set({
          isLoading: true,
          error: null,
        });

        const response = await getUsers(
          email
        );

        set({
          users: response.data,
        });
      } catch (error) {
        console.error(
          "SEARCH USERS ERROR:",
          error
        );

        set({
          users: [],
          error:
            error instanceof Error
              ? error.message
              : "Failed to search customers",
        });
      } finally {
        set({
          isLoading: false,
        });
      }
    },

    clearUsers: () => {
      set({
        users: [],
      });
    },

    clearError: () => {
      set({
        error: null,
      });
    },
  })
);