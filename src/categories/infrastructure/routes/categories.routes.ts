import { Router } from "express";
import { getCategories, getCategory, addCategory, updateCategoryController, deleteCategoryController } from "../controllers/categoryController";
import { authenticateUser } from "../../../auth/infrastructure/middlewares/authMiddleware";

const router = Router();

router.use(authenticateUser); // Apply the auth middleware to all routes

router.get("/", getCategories);
router.get("/:id", getCategory);
router.post("/", addCategory);
router.put("/:id", updateCategoryController);
router.delete("/:id", deleteCategoryController);

export default router;