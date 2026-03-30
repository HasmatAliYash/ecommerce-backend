import { AppDataSource } from "../../config/data-source";
import { Order, OrderStatus } from "./order.entity";
import { OrderItem } from "./order-item.entity";
import { Cart } from "../cart/cart.entity";

const orderRepo = AppDataSource.getRepository(Order);
const itemRepo = AppDataSource.getRepository(OrderItem);
const cartRepo = AppDataSource.getRepository(Cart);

export class PurchaseService {
  async createOrder(userId: string) {
    const cart = await cartRepo.findOne({
      where: { userId },
      relations: ["items", "items.product"],
    });

    if (!cart || cart.items.length === 0) {
      throw new Error("Basket is empty");
    }

    const order = orderRepo.create({
      userId,
      status: OrderStatus.CREATED,
      items: [],
      totalAmount: 0,
    });

    let total = 0;

    order.items = cart.items.map((cartItem) => {
      total += Number(cartItem.product.price) * cartItem.quantity;

      return itemRepo.create({
        productId: cartItem.product.id,
        productName: cartItem.product.name,
        price: cartItem.product.price,
        quantity: cartItem.quantity,
      });
    });

    order.totalAmount = total;
    await orderRepo.save(order);
    await cartRepo.remove(cart);

    return order;
  }

  async getOrders(userId: string) {
    return orderRepo.find({
      where: { userId },
      relations: ["items"],
      order: { createdAt: "DESC" },
    });
  }

  async getById(userId: string, orderId: string) {
    const order = await orderRepo.findOne({
      where: { id: orderId, userId },
      relations: ["items"],
    });

    if (!order) throw new Error("Order not found");
    return order;
  }

  async updateStatus(orderId: string, status: OrderStatus) {
    const order = await orderRepo.findOneBy({ id: orderId });
    if (!order) throw new Error("Order not found");

    order.status = status;
    return orderRepo.save(order);
  }

  async cancelOrder(userId: string, orderId: string) {
    const order = await orderRepo.findOneBy({ id: orderId, userId });
    if (!order) throw new Error("Order not found");

    if (order.status !== OrderStatus.CREATED) {
      throw new Error("Order cannot be cancelled at this stage");
    }

    order.status = OrderStatus.CANCELLED;
    return orderRepo.save(order);
  }
}
