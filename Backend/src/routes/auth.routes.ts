import Express from "express";
import {
  UserRegister,
  AdminRegister,
  AdminLogin,
  UserLogin,
  UserRefreshToken,
  UserLogOut,
  UserProfile,
  UserForgetPassword,
  UserResetPassword,
  UserChangePassword
} from "../controller/auth.controller.js";
import { auth } from "../utils/UserAuth.js";

const authRoutes = Express.Router();

/**
 * Admin Routes
 */
authRoutes.post("/admin/register", AdminRegister);
authRoutes.post("/admin/login", AdminLogin);

/**
 * User Routes
 */
authRoutes.get("/users", UserRegister);
authRoutes.post("/register", UserRegister);
authRoutes.post("/login", UserLogin);
authRoutes.post("/refresh-token", UserRefreshToken);
authRoutes.post("/logout", UserLogOut);
authRoutes.get("/me", auth, UserProfile);
authRoutes.post("/forget-password", auth,UserForgetPassword);
authRoutes.post("/reset-password",auth,UserResetPassword)
authRoutes.patch("/change-password",auth,UserChangePassword)

export default authRoutes;
