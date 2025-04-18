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

/**
 * @swagger
 * tags:
 *   - name: Event
 *     description: Event management
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     tags: [Event]
 *     responses:
 *       200:
 *         description: Events retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "665942a9-97b8-421e-a9b6-78d9ef8a87f1"
 *                         description: Event ID
 *                       date:
 *                         type: string
 *                         example: "2025-01-30"
 *                         description: Event date
 *                       completed:
 *                         type: boolean
 *                         example: false
 *                         description: Event completion status
 *                       user_id:
 *                         type: string
 *                         example: "2fe143ac-e9d0-4878-80ef-27577ab0b91a"
 *                         description: User ID
 *                       precio_total:
 *                         type: number
 *                         example: 0
 *                         description: Total price
 *                       name:
 *                         type: string
 *                         example: "Mercado de Juan"
 *                         description: Event name
 *                       productIds:
 *                         type: array
 *                         items:
 *                           type: string
 *                 message:
 *                   type: string
 *                   example: "Events retrieved successfully"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Please check the request!"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized, token required!"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Resource not found!"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal unknown error has occurred!"
 */
router.get("/", getEvents);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get an event by ID
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID
 *     responses:
 *       200:
 *         description: Event retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "665942a9-97b8-421e-a9b6-78d9ef8a87f1"
 *                       description: Event ID
 *                     date:
 *                       type: string
 *                       example: "2025-01-30"
 *                       description: Event date
 *                     completed:
 *                       type: boolean
 *                       example: false
 *                       description: Event completion status
 *                     user_id:
 *                       type: string
 *                       example: "2fe143ac-e9d0-4878-80ef-27577ab0b91a"
 *                       description: User ID
 *                     precio_total:
 *                       type: number
 *                       example: 0
 *                       description: Total price
 *                     name:
 *                       type: string
 *                       example: "Mercado de Juan"
 *                       description: Event name
 *                     productIds:
 *                       type: array
 *                       items:
 *                         type: string
 *                 message:
 *                   type: string
 *                   example: "Event retrieved successfully"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Please check the request!"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized, token required!"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Resource not found!"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal unknown error has occurred!"
 */
router.get("/:id", getEvent);

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Event]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "665942a9-97b8-421e-a9b6-78d9ef8a87f1"
 *               date:
 *                 type: string
 *                 example: "2025-01-30"
 *               completed:
 *                 type: boolean
 *                 example: false
 *               user_id:
 *                 type: string
 *                 example: "2fe143ac-e9d0-4878-80ef-27577ab0b91a"
 *               precio_total:
 *                 type: number
 *                 example: 0
 *               name:
 *                 type: string
 *                 example: "Mercado de Juan"
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Event created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.post("/", addEventWithProducts);

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update an event by ID
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 example: "2025-01-30"
 *                 description: Event date
 *               name:
 *                 type: string
 *                 example: "Mercado de Juan"
 *                 description: Event name
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "665942a9-97b8-421e-a9b6-78d9ef8a87f1"
 *                       description: Event ID
 *                     date:
 *                       type: string
 *                       example: "2025-01-30"
 *                       description: Event date
 *                     completed:
 *                       type: boolean
 *                       example: false
 *                       description: Event completion status
 *                     user_id:
 *                       type: string
 *                       example: "2fe143ac-e9d0-4878-80ef-27577ab0b91a"
 *                       description: User ID
 *                     precio_total:
 *                       type: number
 *                       example: 0
 *                       description: Total price
 *                     name:
 *                       type: string
 *                       example: "Mercado de Juan"
 *                       description: Event name
 *                     productIds:
 *                       type: array
 *                       items:
 *                         type: string
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: 202020202
 *                             description: Product ID
 *                 message:
 *                   type: string
 *                   example: "Event updated successfully"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Please check the request!"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized, token required!"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Resource not found!"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal unknown error has occurred!"
 */

router.put("/:id", updateEventController);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID
 *     responses:
 *       204:
 *         description: Event deleted successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Please check the request!"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized, token required!"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Resource not found!"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal unknown error has occurred!"
 */
router.delete("/:id", deleteEventController);

export default router;
