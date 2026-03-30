import { DataSource } from "typeorm";
import { User } from "../modules/user/user.entity";
import { env } from "./env";
import { Product } from "../modules/product/product.entity";
import { Cart } from "../modules/cart/cart.entity";
import { CartItem } from "../modules/cart/cart-item.entity";
import { Order } from "../modules/order/order.entity";
import { OrderItem } from "../modules/order/order-item.entity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: env.dbName,
  synchronize: true,
  entities: [User, Product, Cart, CartItem, Order, OrderItem],
});
