import { Router } from "express";
import {
  getCategories,
  getCategory,
  addCategory,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/categoryController";
import { authenticateUser } from "../../../auth/infrastructure/middlewares/authMiddleware";
import { ROUTES_CATEGORIES } from "../../../constants/mpConstanst";

const router = Router();

router.use(authenticateUser); // Apply the auth middleware to all routes

router.get(ROUTES_CATEGORIES.GET_CATEGORY, getCategories);
router.get(ROUTES_CATEGORIES.GET_CATEGORY_ID, getCategory);
router.post(ROUTES_CATEGORIES.POST_CATEGORY, addCategory);
router.put(ROUTES_CATEGORIES.PUT_CATEGORY, updateCategoryController);
router.delete(ROUTES_CATEGORIES.DELETE_CATEGORY, deleteCategoryController);

export default router;
