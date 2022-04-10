import { Column, Entity, OneToMany } from 'typeorm';
import { BasicEntity } from './basic/BasicEntity';
import { Cart } from './Cart';

@Entity('products')
export class Product extends BasicEntity {
  @Column({ length: 150 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', unsigned: true, precision: 8, scale: 2 })
  price: number;

  @Column({ type: 'json', nullable: true })
  images: string[];

  @OneToMany(() => Cart, (cart) => cart.user)
  cart: Cart[];

  @OneToMany(() => Cart, (cart) => cart.user)
  favourites: Cart[];
}
