import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { Product } from './Product';

@Entity('favourites')
export class Favourite {
  @ManyToOne(() => User, (user) => user.cart, { primary: true })
  @JoinColumn({ name: 'user_uuid' })
  user: User;

  @ManyToOne(() => Product, (product) => product.cart, { primary: true })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
