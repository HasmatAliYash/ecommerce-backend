import { Router } from "express";
import { CatalogController } from "./product.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { upload } from "../../middlewares/upload.middleware";

export const productRoutes = Router();
const catalogController = new CatalogController();

/**
 * @openapi
 * /api/products:
 *   post:
 *     tags:
 *       - Catalog
 *     summary: Add a new item to the catalog
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: Wireless Headphones
 *               description:
 *                 type: string
 *                 example: Over-ear noise cancelling headphones
 *               price:
 *                 type: number
 *                 example: 4999
 *     responses:
 *       201:
 *         description: Item added to catalog
 *       401:
 *         description: Unauthorized
 */
productRoutes.post("/", authMiddleware, catalogController.create);

/**
 * @openapi
 * /api/products:
 *   get:
 *     tags: [Catalog]
 *     summary: Retrieve all catalog items
 *     responses:
 *       200:
 *         description: Catalog items returned
 */
productRoutes.get("/", catalogController.getAll);

/**
 * @openapi
 * /api/products/search:
 *   get:
 *     tags: [Catalog]
 *     summary: Search catalog items by keyword
 *     parameters:
 *       - name: q
 *         in: query
 *         schema:
 *           type: string
 */
productRoutes.get("/search", catalogController.search);

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     tags: [Catalog]
 *     summary: Retrieve a catalog item by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 */
productRoutes.get("/:id", catalogController.getById);

/**
 * @openapi
 * /api/products/{id}:
 *   put:
 *     tags: [Catalog]
 *     summary: Update a catalog item
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 */
productRoutes.put("/:id", authMiddleware, catalogController.update);

/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     tags: [Catalog]
 *     summary: Remove a catalog item
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 */
productRoutes.delete("/:id", authMiddleware, catalogController.delete);

/**
 * @openapi
 * /api/products/{id}/image:
 *   post:
 *     tags: [Catalog]
 *     summary: Upload an image for a catalog item
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded and product updated
 *       400:
 *         description: No file uploaded or invalid file type
 *       401:
 *         description: Unauthorized
 */
productRoutes.post(
  "/:id/image",
  authMiddleware,
  upload.single("image"),
  catalogController.uploadImage
);
