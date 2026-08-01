import Express from "express";
import {
  userRegister,
  adminRegister,
  adminLogin,
  userLogin,
  userRefreshToken,
  userLogOut,
  userProfile,
  userForgetPassword,
  userResetPassword,
  userChangePassword,
} from "../controller/auth.controller.js";
import { rateLimiter } from "../middleware/rateLimiter.js";
import { verifyAccessTokenAndGetUser } from "../middleware/verifyToken.js";

const authRoutes = Express.Router();

/**
 * Admin Routes
 */
authRoutes.post("/admin/register", rateLimiter, adminRegister);
authRoutes.post("/admin/login", rateLimiter, adminLogin);

/**
 * User Routes
 */
authRoutes.get("/users", rateLimiter, userRegister);
authRoutes.post("/register", rateLimiter, userRegister);
authRoutes.post("/login", rateLimiter, userLogin);
authRoutes.post("/refresh-token", userRefreshToken);
authRoutes.post("/logout", userLogOut);
authRoutes.get("/me", verifyAccessTokenAndGetUser, userProfile);
authRoutes.post(
  "/forget-password",
  rateLimiter,
  verifyAccessTokenAndGetUser,
  userForgetPassword,
);
authRoutes.post(
  "/reset-password",
  rateLimiter,
  verifyAccessTokenAndGetUser,
  userResetPassword,
);
authRoutes.patch(
  "/change-password",
  rateLimiter,
  verifyAccessTokenAndGetUser,
  userChangePassword,
);

export default authRoutes;
