import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BasicEntity } from './basic/BasicEntity';
import { Product } from './Product';
import { Order } from './Order';

@Entity('items')
export class Item extends BasicEntity {
  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.cart)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'smallint', unsigned: true })
  quantity: number;

  @Column({ type: 'decimal', unsigned: true, precision: 8, scale: 2 })
  total_price: number;
}
