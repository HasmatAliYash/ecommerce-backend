import { Request, Response } from "express";
import { BasketService } from "./cart.service";
import { addToCartSchema, updateQuantitySchema } from "./cart.schema";

const basketService = new BasketService();

export class BasketController {
  static async addItem(req: any, res: Response) {
    const data = addToCartSchema.parse(req.body);
    const item = await basketService.addItem(
      req.userId,
      data.productId,
      data.quantity
    );
    res.status(201).json(item);
  }

  static async getCart(req: any, res: Response) {
    res.json(await basketService.getCart(req.userId));
  }

  static async updateQuantity(req: Request, res: Response) {
    const data = updateQuantitySchema.parse(req.body);
    res.json(
      await basketService.updateQuantity(String(req.params.itemId), data.quantity)
    );
  }

  static async removeItem(req: Request, res: Response) {
    res.json(await basketService.removeItem(String(req.params.itemId)));
  }

  static async clearCart(req: any, res: Response) {
    res.json(await basketService.clearCart(req.userId));
  }
}
