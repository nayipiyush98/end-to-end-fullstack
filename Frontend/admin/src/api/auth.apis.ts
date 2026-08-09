  import { api } from "@/api/axios";
  import {
    API_BASE_URL,
    HTTP_STATUS
  } from "@/lib/constants";


  export interface LoginPayload {
      email : string;
      password : string;
  }

  export interface RegisterPayload{
    name:string,
    email:string,
    password:string
  }

  export interface LoginResponse {
  message: string;
  accessToken: string;
  admin: Admin;
}



  export interface Admin {
    id: number;
    name: string;
    email: string;
    role: string | null;
    permissions: string[];
  }
  export interface RegisterResponse{
    code:typeof HTTP_STATUS.OK | typeof HTTP_STATUS.UNAUTHORIZED;
    message:string;
    data:Admin
  }

  export const login = (data: LoginPayload) => {
    return api.post<LoginResponse>(API_BASE_URL + "/auth/admin/login", data);
  };


  export const register = (data:RegisterPayload)=> {
    return api.post<RegisterResponse>(API_BASE_URL + "/auth/admin/register",data)
  }

  export const logout = () => {
    return api.post(API_BASE_URL + "/auth/admin/logout");
  };

  export const me = () => {
    return api.get<Admin>(API_BASE_URL + "/auth/admin/me");
  };

  export const refresh = () => {
    return api.post<LoginResponse>(API_BASE_URL + "/auth/admin/refresh");
  }