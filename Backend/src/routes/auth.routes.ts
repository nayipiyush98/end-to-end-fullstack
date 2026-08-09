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
  adminRefreshToken,
  adminMe,
} from "../controller/auth.controller.js";
import { rateLimiter } from "../middleware/rateLimiter.js";
import { verifyAccessTokenAndGetUser } from "../middleware/verifyToken.js";
import { adminAuth } from "../middleware/adminAuth.js";

const authRoutes = Express.Router();

/**
 * Admin Routes
 */
authRoutes.post("/admin/register", rateLimiter, adminRegister);
authRoutes.post("/admin/login", rateLimiter, adminLogin);
authRoutes.get("/admin/me", adminAuth, adminMe);
authRoutes.post("/admin/refresh", adminRefreshToken);

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
