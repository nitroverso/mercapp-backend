import { Router } from "express";
import {
  getProducts,
  getProduct,
  addProduct,
  updateProductController,
  deleteProductController,
} from "../controllers/productController";
import { authenticateUser } from "../../../auth/infrastructure/middlewares/authMiddleware";

const router = Router();

router.use(authenticateUser); // Apply the auth middleware to all routes

/**
 * @swagger
 * tags:
 *   - name: Product
 *     description: Product management
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Products retrieved successfully
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
 *                         description: Product ID
 *                       name:
 *                         type: string
 *                         example: "Carnes"
 *                         description: Product name
 *                       description:
 *                         type: string
 *                         example: "Fresh meat"
 *                         description: Product description
 *                       price:
 *                         type: number
 *                         example: 10.99
 *                         description: Product price
 *                 message:
 *                   type: string
 *                   example: "Success!"
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
router.get("/", getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product retrieved successfully
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
 *                       example: "123e4567-e89b-12d53-a44456-42688614174000"
 *                       description: Product ID
 *                     name:
 *                       type: string
 *                       example: "Carnes"
 *                       description: Product name
 *                     description:
 *                       type: string
 *                       example: "Fresh meat"
 *                       description: Product description
 *                     price:
 *                       type: number
 *                       example: 10.99
 *                       description: Product price
 *                 message:
 *                   type: string
 *                   example: "Product retrieved successfully"
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
router.get("/:id", getProduct);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Atun"
 *                 description: Product name
 *               category_id:
 *                 type: string
 *                 example: "acbb75bc-9b5c-403e-9969-a955a99c623e"
 *                 description: Category ID
 *               unit_id:
 *                 type: string
 *                 example: "e7cc30d8-5dd8-4e1f-b4ad-6b792370dd18"
 *                 description: Unit ID
 *               quantity:
 *                 type: number
 *                 example: 3
 *                 description: Quantity
 *     responses:
 *       200:
 *         description: Product created successfully
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
 *                       example: "9aac72d0-622f-4025-991c-88f5e0a913b0"
 *                       description: Product ID
 *                     name:
 *                       type: string
 *                       example: "Atun"
 *                       description: Product name
 *                     category_id:
 *                       type: string
 *                       example: "acbb75bc-9b5c-403e-9969-a955a99c623e"
 *                       description: Category ID
 *                     unit_id:
 *                       type: string
 *                       example: "e7cc30d8-5dd8-4e1f-b4ad-6b792370dd18"
 *                       description: Unit ID
 *                     quantity:
 *                       type: number
 *                       example: 3
 *                       description: Quantity
 *                 message:
 *                   type: string
 *                   example: "Success!"
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
router.post("/", addProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Atun"
 *                 description: Product name
 *               category_id:
 *                 type: string
 *                 example: "acbb75bc-9b5c-403e-9969-a955a99c623e"
 *                 description: Category ID
 *               unit_id:
 *                 type: string
 *                 example: "e7cc30d8-5dd8-4e1f-b4ad-6b792370dd18"
 *                 description: Unit ID
 *               quantity:
 *                 type: number
 *                 example: 3
 *                 description: Quantity
 *     responses:
 *       200:
 *         description: Product updated successfully
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
 *                       example: "9aac72d0-622f-4025-991c-88f5e0a913b0"
 *                       description: Product ID
 *                     name:
 *                       type: string
 *                       example: "Atun"
 *                       description: Product name
 *                     category_id:
 *                       type: string
 *                       example: "acbb75bc-9b5c-403e-9969-a955a99c623e"
 *                       description: Category ID
 *                     unit_id:
 *                       type: string
 *                       example: "e7cc30d8-5dd8-4e1f-b4ad-6b792370dd18"
 *                       description: Unit ID
 *                     quantity:
 *                       type: number
 *                       example: 3
 *                       description: Quantity
 *                 message:
 *                   type: string
 *                   example: "Product updated successfully"
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
router.put("/:id", updateProductController);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       204:
 *         description: Product deleted successfully
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
router.delete("/:id", deleteProductController);

export default router;
