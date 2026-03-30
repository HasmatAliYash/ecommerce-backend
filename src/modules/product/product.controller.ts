import { createProductSchema, updateProductSchema } from "./product.schema";
import { CatalogService } from "./product.service";
import { Request, Response } from "express";
import { logger } from "../../utils/logger";

const catalogService = new CatalogService();

export class CatalogController {
  async create(req: Request, res: Response) {
    const data = createProductSchema.parse(req.body);
    const product = await catalogService.create(data);
    logger.info(`Product created: ${product.id}`);
    res.json(product);
  }

  async getAll(_req: Request, res: Response) {
    res.json(await catalogService.getAll());
  }

  async getById(req: Request, res: Response) {
    res.json(await catalogService.getById(String(req.params.id)));
  }

  async update(req: Request, res: Response) {
    const data = updateProductSchema.parse(req.body);
    res.json(await catalogService.update(String(req.params.id), data));
  }

  async delete(req: Request, res: Response) {
    res.json(await catalogService.delete(String(req.params.id)));
  }

  async search(req: Request, res: Response) {
    const q = String(req.query.q || "");
    res.json(await catalogService.search(q));
  }

  async uploadImage(req: Request, res: Response) {
    const file = req.file;
    if (!file) throw new Error("No file uploaded");
    const imageUrl = `/uploads/${file.filename}`;
    const product = await catalogService.uploadImage(String(req.params.id), imageUrl);
    logger.info(`Image uploaded for product: ${req.params.id}`);
    res.json(product);
  }
}
