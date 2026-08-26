import Express from "express";
import { getUsersController } from "../controller/users.controller.js";
import { auth } from "../middleware/auth.js";
const usersRoutes = Express.Router();
usersRoutes.get("/users", auth, getUsersController);
export default usersRoutes;
//# sourceMappingURL=users.routes.js.map