import Express from "express";
import { getProductByIdController, getProductsController, createProductController, updateProductController, updateStockController, deleteProductController, addProductImagesController, } from "../controller/product.controller.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { authorize } from "../middleware/authorize.js";
import { uploadProductImages } from "../services/upload.service.js";
const productRoutes = Express.Router();
/** Admin Routes */
productRoutes.post("/products", adminAuth, authorize("create_product"), uploadProductImages.array("images", 5), createProductController);
productRoutes.put("/products/:id", adminAuth, authorize("update_product"), uploadProductImages.array("images", 5), updateProductController);
productRoutes.patch("/products/:id/stock", adminAuth, authorize("update_stock"), updateStockController);
productRoutes.delete("/products/:id", adminAuth, authorize("delete_product"), deleteProductController);
productRoutes.post("/products/:id/images", adminAuth, authorize("update_product"), uploadProductImages.array("images", 5), addProductImagesController);
/** * User Routes */
productRoutes.get("/products", getProductsController);
productRoutes.get("/products/:id", getProductByIdController);
export default productRoutes;
//# sourceMappingURL=products.routes.js.map