import { api } from "@/api/axios";
import {
  API_BASE_URL,
  HTTP_STATUS
} from "@/lib/constants";

export interface LoginPayload {
    email : String;
    password : String;
}

export interface RegisterPayload{
  name:String,
  email:String,
  password:String
}

export interface LoginResponse {
    code: typeof HTTP_STATUS.OK | typeof HTTP_STATUS.UNAUTHORIZED;
    message: string;
    accessToken: string;
}

export interface Admin {
  id: number;
  name: string;
  email: string;
}
export interface RegisterResponse{
  code:typeof HTTP_STATUS.OK | typeof HTTP_STATUS.UNAUTHORIZED;
  message:String;
  data:Admin
}

export const login = (data: LoginPayload) => {
  return api.post<LoginResponse>(API_BASE_URL + "/auth/admin/login", data);
};

export const register = (data:RegisterPayload)=> {
  return api.post<RegisterResponse>(API_BASE_URL + "/auth/admin/register",data)
}
