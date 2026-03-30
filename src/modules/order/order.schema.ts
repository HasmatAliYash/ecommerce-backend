import { z } from "zod";
import { OrderStatus } from "./order.entity";

export const updateOrderStatusSchema = z.object({
  status: z.enum(OrderStatus),
});
