import { Router } from "express";
import { getProducts, getProduct, addProduct, updateProductController, deleteProductController } from "../controllers/productController";
import { authenticateUser } from "../../../auth/infrastructure/middlewares/authMiddleware";

const router = Router();

router.use(authenticateUser); // Apply the auth middleware to all routes

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", addProduct);
router.put("/:id", updateProductController);
router.delete("/:id", deleteProductController);

export default router;