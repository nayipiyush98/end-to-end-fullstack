import Express from "express";

import { getUsersController,getUserProfileController,updateUserProfileController } from "../controller/users.controller.js";
import { auth } from "../middleware/auth.js";

const usersRoutes = Express.Router();

usersRoutes.get(
  "/users",
  auth,
  getUsersController
);

usersRoutes.get(
  "/users/profile",
  auth,
  getUserProfileController
);

usersRoutes.put(
  "/users/profile",
  auth,
  updateUserProfileController
);

export default usersRoutes;