export interface Admin {
  id: number;
  name: string;
  email: string;
  role: string | null;
  permissions: string[];
}


export interface AuthState {
  admin: Admin | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setAccessToken: (accessToken: string) => void;
  setAuth: (accessToken: string, admin: Admin) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
}