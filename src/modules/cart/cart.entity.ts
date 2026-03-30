import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from "typeorm";
import { CartItem } from "./cart-item.entity";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column()
  userId!: string;

  @OneToMany(() => CartItem, (item) => item.cart, {
    cascade: true,
  })
  items!: CartItem[];
}
