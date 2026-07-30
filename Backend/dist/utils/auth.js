import { verifyRefreshToken } from "./jwt.js";
export function getRefreshToken(refreshToken) {
    if (!refreshToken) {
        throw new Error("Refresh token missing");
    }
    return verifyRefreshToken(refreshToken);
}
//# sourceMappingURL=auth.js.map