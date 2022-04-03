import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BasicEntity } from './basic/BasicEntity';
import { User } from './User';
import { Item } from './Item';

@Entity('orders')
export class Order extends BasicEntity {
  @Column({ type: 'decimal', unsigned: true, precision: 8, scale: 2 })
  total_price: number;

  @ManyToOne(() => User, (user) => user.orders, { nullable: true })
  @JoinColumn({ name: 'user_uuid' })
  user: User;

  @OneToMany(() => Item, (items) => items.order)
  items: Item[];
}
