import { api } from "@/api/axios";
import {
  API_BASE_URL,
  HTTP_STATUS
} from "@/lib/constants";

export interface LoginPayload {
    email : String;
    password : String;
}
export interface LoginResponse {
    code: typeof HTTP_STATUS.OK | typeof HTTP_STATUS.UNAUTHORIZED;
    message: string;
    accessToken: string;
}

export const login = (data: LoginPayload) => {
  return api.post<LoginResponse>(API_BASE_URL + "/auth/admin/login", data);
};
