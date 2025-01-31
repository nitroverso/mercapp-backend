import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  deleteUserController,
} from "../controllers/auth.controller";
import { ROUTES_LOGIN } from "../../../constants/mpConstanst";

const router = Router();

router.post(ROUTES_LOGIN.REGISTER, registerUser);
router.post(ROUTES_LOGIN.LOGIN, loginUser);
router.post(ROUTES_LOGIN.LOGOUT, logoutUser);
router.delete(ROUTES_LOGIN.DELETE, deleteUserController);

export default router;
