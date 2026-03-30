import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Order, (order) => order.items, {
    onDelete: "CASCADE",
  })
  order!: Order;

  @Column()
  productId!: string;

  @Column()
  productName!: string;

  @Column("decimal")
  price!: number;

  @Column()
  quantity!: number;
}
