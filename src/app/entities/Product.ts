import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BasicEntity } from './basic/BasicEntity';
import { Manufacturer } from './Manufacturer';
import { Category } from './Category';
import { Review } from './Review';
import { Cart } from './Cart';
import { ProductSpecification } from './ProductSpecification';
import { ProductCompatible } from './ProductCompatible';

@Entity('products')
export class Product extends BasicEntity {
  @Column({ length: 150 })
  name: string;

  @Column()
  short_description: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ length: 120 })
  article: string;

  @Column({ type: 'smallint', unsigned: true, default: 1 })
  stock: number;

  @Column({ type: 'decimal', unsigned: true, precision: 8, scale: 2 })
  price: number;

  @OneToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToOne(() => Manufacturer)
  @JoinColumn({ name: 'manufacturer_id' })
  manufacturer: Manufacturer;

  @OneToMany(() => Review, (reviews) => reviews.product)
  reviews: Review[];

  @OneToMany(() => Cart, (cart) => cart.user)
  cart: Cart[];

  @OneToMany(() => ProductSpecification, (specifications) => specifications.product)
  specifications: ProductSpecification[];

  @OneToMany(() => ProductCompatible, (compatibles) => compatibles.product)
  compatibles: ProductSpecification[];
}
