import express from "express";
import "reflect-metadata";
import path from "path";
import { userRoutes } from "./modules/user/user.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { requestLogger } from "./middlewares/request-logger.middleware";
import { setupSwagger } from "./config/swagger";
import { productRoutes } from "./modules/product/product.routes";
import { cartRoutes } from "./modules/cart/cart.routes";
import { orderRoutes } from "./modules/order/order.routes";

export const app = express();

app.use(express.json());
app.use(requestLogger);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

setupSwagger(app);

app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.use(errorMiddleware);
