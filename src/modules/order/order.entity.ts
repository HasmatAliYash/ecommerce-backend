import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { OrderItem } from "./order-item.entity";

export enum OrderStatus {
  CREATED = "CREATED",
  PAID = "PAID",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  userId!: string;

  @OneToMany(() => OrderItem, (item) => item.order, {
    cascade: true,
  })
  items!: OrderItem[];

  @Column("decimal")
  totalAmount!: number;

  @Column({
    type: "text",
    default: OrderStatus.CREATED,
  })
  status!: OrderStatus;

  @CreateDateColumn()
  createdAt!: Date;
}
