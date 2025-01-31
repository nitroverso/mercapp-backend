import { Router } from "express";
import {
  addEventWithProducts,
  getEvent,
  getEvents,
  updateEventController,
  deleteEventController,
} from "../controllers/eventController";
import { authenticateUser } from "../../../auth/infrastructure/middlewares/authMiddleware";

const router = Router();

router.use(authenticateUser); // Apply the auth middleware to all routes

router.get("/", getEvents);
router.get("/:id", getEvent);
router.post("/", addEventWithProducts);
router.put("/:id", updateEventController);
router.delete("/:id", deleteEventController);

export default router;
