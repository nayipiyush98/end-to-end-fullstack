import { verifyRefreshToken } from "./jwt.js";

export function getRefreshToken(refreshToken?: string) {
  if (!refreshToken) {
    throw new Error("Refresh token missing");
  }

  return verifyRefreshToken(refreshToken) as {
    id: number;
  };
}