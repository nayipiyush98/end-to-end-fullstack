import Express from "express";
import { getAllCategories, createCategoryController, updateCategoryController, deleteCategoryController } from "../controller/categories.controller.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { authorize } from "../middleware/authorize.js";
const categoriesRoutes = Express.Router();
//public
categoriesRoutes.get("/categories", getAllCategories);
//admin
categoriesRoutes.post("/categories", adminAuth, authorize("create_category"), createCategoryController);
categoriesRoutes.put("/categories/:id", adminAuth, authorize("update_category"), updateCategoryController);
categoriesRoutes.delete("/categories/:id", adminAuth, authorize("delete_category"), deleteCategoryController);
export default categoriesRoutes;
//# sourceMappingURL=categories.routes.js.map