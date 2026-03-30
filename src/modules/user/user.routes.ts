import { Router } from "express";
import { AccountController } from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const accountController = new AccountController();
export const userRoutes = Router();

/**
 * @openapi
 * /api/users/register:
 *   post:
 *     tags:
 *       - Accounts
 *     summary: Create a new account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Account created, tokens returned
 */
userRoutes.post("/register", accountController.register);

/**
 * @openapi
 * /api/users/login:
 *   post:
 *     tags:
 *       - Accounts
 *     summary: Authenticate and receive tokens
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Authentication successful
 */
userRoutes.post("/login", accountController.login);

/**
 * @openapi
 * /api/users/profile:
 *   get:
 *     tags: [Accounts]
 *     summary: Fetch the authenticated user's profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile data returned
 */
userRoutes.get("/profile", authMiddleware, accountController.profile);

/**
 * @openapi
 * /api/users/profile:
 *   put:
 *     tags: [Accounts]
 *     summary: Modify the authenticated user's profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated
 */
userRoutes.put("/profile", authMiddleware, accountController.updateProfile);

/**
 * @openapi
 * /api/users/change-password:
 *   put:
 *     tags: [Accounts]
 *     summary: Update account password
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated
 */
userRoutes.put(
  "/change-password",
  authMiddleware,
  accountController.changePassword
);
