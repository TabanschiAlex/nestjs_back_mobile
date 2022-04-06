import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { Product } from './Product';
import { BasicEntity } from './basic/BasicEntity';

@Entity('favourites')
export class Favourite extends BasicEntity {
  @ManyToOne(() => User, (user) => user.cart)
  @JoinColumn({ name: 'user_uuid' })
  user: User;

  @ManyToOne(() => Product, (product) => product.cart)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
