import { AppDataSource } from "../../config/data-source";
import { Product } from "../product/product.entity";
import { CartItem } from "./cart-item.entity";
import { Cart } from "./cart.entity";

const cartRepo = AppDataSource.getRepository(Cart);
const itemRepo = AppDataSource.getRepository(CartItem);
const productRepo = AppDataSource.getRepository(Product);

export class BasketService {
  async getOrCreateCart(userId: string) {
    let cart = await cartRepo.findOne({
      where: { userId },
      relations: ["items", "items.product"],
    });

    if (!cart) {
      cart = cartRepo.create({ userId, items: [] });
      await cartRepo.save(cart);
    }

    return cart;
  }

  async addItem(userId: string, productId: string, quantity: number) {
    const cart = await this.getOrCreateCart(userId);
    const product = await productRepo.findOneBy({ id: productId });
    if (!product) throw new Error("Product not found");

    const existing = cart.items.find((item) => item.product.id === productId);

    if (existing) {
      existing.quantity += quantity;
      return itemRepo.save(existing);
    }

    const item = itemRepo.create({ cart, product, quantity });
    return itemRepo.save(item);
  }

  async getCart(userId: string) {
    return this.getOrCreateCart(userId);
  }

  async updateQuantity(itemId: string, quantity: number) {
    const item = await itemRepo.findOneBy({ id: itemId });
    if (!item) throw new Error("Cart item not found");

    item.quantity += quantity;
    return itemRepo.save(item);
  }

  async removeItem(itemId: string) {
    const item = await itemRepo.findOneBy({ id: itemId });
    if (!item) throw new Error("Cart item not found");

    await itemRepo.remove(item);
    return { message: "Item removed" };
  }

  async clearCart(userId: string) {
    const cart = await cartRepo.findOne({
      where: { userId },
      relations: ["items"],
    });
    if (!cart) return;

    await itemRepo.remove(cart.items);
    return { message: "Basket cleared" };
  }
}
