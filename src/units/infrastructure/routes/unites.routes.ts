import { Router } from "express";
import { getUnits } from "../controllers/unitController";
import { authenticateUser } from "../../../auth/infrastructure/middlewares/authMiddleware";
import { ROUTES_UNIT } from "../../../constants/mpConstanst";

const router = Router();

router.use(authenticateUser);

/**
 * @swagger
 * tags:
 *   - name: Units
 *     description: Category management
 */

/**
 * @swagger
 * /units:
 *   get:
 *     summary: Get all units
 *     tags: [Unit]
 *     responses:
 *       200:
 *         description: Unites successfully
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
 *                         example: "123e4567-e89b-12d53-a44456-42688614174000"
 *                         description: Unit ID
 *                       name:
 *                         type: string
 *                         example: "kg"
 *                         description: Unit name
 *                       message:
 *                         type: string
 *                         example: "Success!"
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
router.get(ROUTES_UNIT.GET_UNIT, getUnits);

export default router;
