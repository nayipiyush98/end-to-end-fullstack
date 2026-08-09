import { useAuthStore } from "@/store/auth.store";

import {
  login as adminLogin,
  logout as adminLogout,
  refresh,
  me,
} from "@/api/auth.apis";

export function useAuth() {
  const admin = useAuthStore((state) => state.admin);

  const accessToken = useAuthStore(
    (state) => state.accessToken
  );

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  const isLoading = useAuthStore(
    (state) => state.isLoading
  );

  const setAuth = useAuthStore(
    (state) => state.setAuth
  );

  const setAccessToken = useAuthStore(
    (state) => state.setAccessToken
  );

  const setLoading = useAuthStore(
    (state) => state.setLoading
  );

  const clearAuth = useAuthStore(
    (state) => state.logout
  );

  // LOGIN
  const login = async (data: {
    email: string;
    password: string;
  }) => {
    const response = await adminLogin(data);

    setAuth(
      response.accessToken,
      response.admin
    );

    return response;
  };

  // GET ADMIN
  const getAdmin = async () => {
    if (!accessToken) {
      return null;
    }

    const adminResponse = await me();

    setAuth(
      accessToken,
      adminResponse
    );

    return adminResponse;
  };

  // INITIALIZE AUTH
  const initializeAuth = async () => {
    try {
      setLoading(true);

      console.log("REFRESH START");

      // 1. Get new access token
      const refreshResponse = await refresh();

      console.log(
        "REFRESH RESPONSE:",
        refreshResponse
      );

      // 2. IMPORTANT:
      // Store new access token BEFORE calling /me
      setAccessToken(
        refreshResponse.accessToken
      );

      console.log(
        "NEW TOKEN STORED IN ZUSTAND"
      );

      // 3. Now Axios can read the token
      const adminResponse = await me();

      console.log(
        "ME RESPONSE:",
        adminResponse
      );

      // 4. Store admin information
      setAuth(
        refreshResponse.accessToken,
        adminResponse
      );

      console.log("AUTH RESTORED");

      return true;

    } catch (error) {
      console.error(
        "AUTH INITIALIZATION ERROR:",
        error
      );

      if (error instanceof Error) {
        console.error(
          "MESSAGE:",
          error.message
        );

        console.error(
          "STACK:",
          error.stack
        );
      }

      clearAuth();

      return false;

    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await adminLogout();
    } finally {
      clearAuth();
    }
  };

  return {
    admin,
    accessToken,
    isAuthenticated,
    isLoading,

    login,
    getAdmin,
    initializeAuth,
    logout,
  };
}