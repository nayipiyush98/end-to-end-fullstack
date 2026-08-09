import { create } from "zustand";
import type { AuthState } from "@/types/auth";

export const useAuthStore = create<AuthState>((set) => ({
  admin: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading:true,

   setAccessToken: (accessToken) =>
    set({
      accessToken,
    }),

  setAuth: (accessToken, admin) =>
    set({
      accessToken,
      admin,
      isAuthenticated: true,
    }),

    setLoading: (loading) =>
    set({
      isLoading: loading,
    }),

  logout: () =>
    set({
      admin: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
    }),
}));