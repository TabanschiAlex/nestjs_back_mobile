import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BasicEntity } from './basic/BasicEntity';
import { User } from './User';
import { Product } from './Product';

@Entity('carts')
export class Cart extends BasicEntity {
  @ManyToOne(() => User, (user) => user.cart)
  @JoinColumn({ name: 'user_uuid' })
  user: User;

  @ManyToOne(() => Product, (product) => product.cart)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'smallint', unsigned: true })
  count: number;

  @Column({ length: 64, nullable: true })
  discount: string;

  @Column({ type: 'decimal', unsigned: true, precision: 8, scale: 2 })
  total_price: number;
}
