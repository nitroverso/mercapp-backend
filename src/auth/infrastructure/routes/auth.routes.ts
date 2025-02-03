import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  deleteUserController,
} from "../controllers/auth.controller";
import { ROUTES_LOGIN } from "../../../constants/mpConstanst";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: All Auth routes for login, register and logout
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "camilotest@gmail.com"
 *                 description: User email
 *               password:
 *                 type: string
 *                 example: "123456"
 *                 description: User password
 *               firstName:
 *                 type: string
 *                 example: "Camilo"
 *                 description: User first name
 *               lastName:
 *                 type: string
 *                 example: "Carrion Ramirez"
 *                 description: User last name
 *               birthday:
 *                 type: string
 *                 example: "26/02/1996"
 *                 description: User birthday write in format dd/mm/yyyy
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                      type: string
 *                      example: "Success!"
 *                 email:
 *                   type: string
 *                   example: "camilotest@gmail.com"
 *                   description: User email
 *                 password:
 *                   type: string
 *                   example: "123456"
 *                   description: User password
 *                 firstName:
 *                   type: string
 *                   example: "Camilo"
 *                   description: User first name
 *                 lastName:
 *                   type: string
 *                   example: "Carrion Ramirez"
 *                   description: User last name
 *                 birthday:
 *                   type: string
 *                   example: "26/02/1996"
 *                   description: User birthday write in format dd/mm/yyyy
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
router.post(ROUTES_LOGIN.REGISTER, registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "jccantillog@gmail.com"
 *                 description: User email
 *               password:
 *                 type: string
 *                 example: "123456"
 *                 description: User password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Session successfully created"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "23feaf41-1237-421e-bc49-9f5b1e71854d"
 *                     firstName:
 *                       type: string
 *                       example: "Jonathan"
 *                     lastName:
 *                       type: string
 *                       example: "Cantillo"
 *                     birthday:
 *                       type: string
 *                       example: "21/02/1997"
 *                 session:
 *                   type: object
 *                   properties:
 *                     message:
 *                      type: string
 *                      example: "Success!"
 *                     id:
 *                       type: string
 *                       example: "23feaf41-1237-421e-bc49-9f5b1e71854d"
 *                     aud:
 *                       type: string
 *                       example: "authenticated"
 *                     role:
 *                       type: string
 *                       example: "authenticated"
 *                     email:
 *                       type: string
 *                       example: "jccantillog@gmail.com"
 *                     email_confirmed_at:
 *                       type: string
 *                       example: "2025-01-26T01:20:37.627353Z"
 *                     phone:
 *                       type: string
 *                       example: ""
 *                     confirmed_at:
 *                       type: string
 *                       example: "2025-01-26T01:20:37.627353Z"
 *                     last_sign_in_at:
 *                       type: string
 *                       example: "2025-02-03T17:55:12.151517505Z"
 *                     app_metadata:
 *                       type: object
 *                       properties:
 *                         provider:
 *                           type: string
 *                           example: "email"
 *                         providers:
 *                           type: array
 *                           items:
 *                             type: string
 *                             example: "email"
 *                     user_metadata:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                           example: "jccantillog@gmail.com"
 *                         email_verified:
 *                           type: boolean
 *                           example: true
 *                         phone_verified:
 *                           type: boolean
 *                           example: false
 *                         sub:
 *                           type: string
 *                           example: "23feaf41-1237-421e-bc49-9f5b1e71854d"
 *                     identities:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           identity_id:
 *                             type: string
 *                             example: "0b539edb-ba7c-4c03-adce-1a084e52d9c8"
 *                           id:
 *                             type: string
 *                             example: "23feaf41-1237-421e-bc49-9f5b1e71854d"
 *                           user_id:
 *                             type: string
 *                             example: "23feaf41-1237-421e-bc49-9f5b1e71854d"
 *                           identity_data:
 *                             type: object
 *                             properties:
 *                               email:
 *                                 type: string
 *                                 example: "jccantillog@gmail.com"
 *                               email_verified:
 *                                 type: boolean
 *                                 example: false
 *                               phone_verified:
 *                                 type: boolean
 *                                 example: false
 *                               sub:
 *                                 type: string
 *                                 example: "23feaf41-1237-421e-bc49-9f5b1e71854d"
 *                           provider:
 *                             type: string
 *                             example: "email"
 *                           last_sign_in_at:
 *                             type: string
 *                             example: "2025-01-26T01:20:37.614706Z"
 *                           created_at:
 *                             type: string
 *                             example: "2025-01-26T01:20:37.614781Z"
 *                           updated_at:
 *                             type: string
 *                             example: "2025-01-26T01:20:37.614781Z"
 *                           email:
 *                             type: string
 *                             example: "jccantillog@gmail.com"
 *                     created_at:
 *                       type: string
 *                       example: "2025-01-26T01:20:37.594802Z"
 *                     updated_at:
 *                       type: string
 *                       example: "2025-02-03T17:55:12.161013Z"
 *                     is_anonymous:
 *                       type: boolean
 *                       example: false
 *                 jwt:
 *                   type: string
 *                   example: "eyJhbGciOiJIUz..."
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
router.post(ROUTES_LOGIN.LOGIN, loginUser);

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: All Auth routes for login, register and logout
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: logout user
 *     tags: [Auth]
 *     requestBody:
 *       required: false
 *       
 *     responses:
 *       200:
 *         description: User logout successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Session closed successfully"
 *                   description: logout user
 *                 
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
router.post(ROUTES_LOGIN.LOGOUT, logoutUser);

/**
 * @swagger
 * /auth/delete/{id}:
 *   delete:
 *     summary: Deleted an user
 *     tags: [Auth]
 *     requestBody:
 *       required: false
 *       
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *                   description: delete user
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
router.delete(ROUTES_LOGIN.DELETE, deleteUserController);

export default router;
