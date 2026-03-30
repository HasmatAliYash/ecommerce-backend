import { Router } from "express";
import { BasketController } from "./cart.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

export const cartRoutes = Router();

/**
 * @openapi
 * /api/cart:
 *   post:
 *     tags: [Basket]
 *     summary: Add an item to the basket
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId, quantity]
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Item added to basket
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
cartRoutes.post("/", authMiddleware, BasketController.addItem);

/**
 * @openapi
 * /api/cart:
 *   get:
 *     tags: [Basket]
 *     summary: Retrieve the current user's basket
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Basket returned
 *       401:
 *         description: Unauthorized
 */
cartRoutes.get("/", authMiddleware, BasketController.getCart);

/**
 * @openapi
 * /api/cart/{itemId}:
 *   put:
 *     tags: [Basket]
 *     summary: Adjust quantity of a basket item
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: itemId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [quantity]
 *             properties:
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Quantity updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Item not found
 */
cartRoutes.put("/:itemId", authMiddleware, BasketController.updateQuantity);

/**
 * @openapi
 * /api/cart/{itemId}:
 *   delete:
 *     tags: [Basket]
 *     summary: Remove a specific item from the basket
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: itemId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Item not found
 */
cartRoutes.delete("/:itemId", authMiddleware, BasketController.removeItem);

/**
 * @openapi
 * /api/cart:
 *   delete:
 *     tags: [Basket]
 *     summary: Empty the entire basket
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Basket emptied
 *       401:
 *         description: Unauthorized
 */
cartRoutes.delete("/", authMiddleware, BasketController.clearCart);
