import { Response } from "express";
import { PurchaseService } from "./order.service";
import { updateOrderStatusSchema } from "./order.schema";

const purchaseService = new PurchaseService();

export class PurchaseController {
  static async create(req: any, res: Response) {
    const order = await purchaseService.createOrder(req.userId);
    res.status(201).json(order);
  }

  static async getOrders(req: any, res: Response) {
    res.json(await purchaseService.getOrders(req.userId));
  }

  static async getById(req: any, res: Response) {
    res.json(await purchaseService.getById(req.userId, req.params.id));
  }

  static async updateStatus(req: any, res: Response) {
    const data = updateOrderStatusSchema.parse(req.body);
    res.json(await purchaseService.updateStatus(req.params.id, data.status));
  }

  static async cancel(req: any, res: Response) {
    res.json(await purchaseService.cancelOrder(req.userId, req.params.id));
  }
}
