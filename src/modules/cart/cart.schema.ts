import { z } from "zod";

export const addToCartSchema = z.object({
  productId: z.uuid(),
  quantity: z.number().min(1),
});

export const updateQuantitySchema = z.object({
  quantity: z.number().min(1),
});
