import { Router } from "express";
import { registerUser, loginUser, logoutUser, deleteUserController } from "../controllers/auth.controller";


const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.delete("/delete/:userId", deleteUserController);

export default router;