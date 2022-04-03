import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Roles } from '../enumerable/roles/Roles';
import { Review } from './Review';
import { Address } from './Address';
import { Cart } from './Cart';
import { PasswordReset } from './PasswordReset';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ length: 150, nullable: true })
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  roles: Roles;

  @Column({ default: false })
  confirmed: boolean;

  @Column({ default: false })
  banned: boolean;

  @OneToMany(() => Review, (reviews) => reviews.user)
  reviews: Review[];

  @OneToMany(() => Address, (addresses) => addresses.user)
  addresses: Address[];

  @OneToMany(() => Cart, (cart) => cart.user)
  cart: Cart[];

  @OneToMany(() => PasswordReset, (passwordResets) => passwordResets.user)
  passwordResets: PasswordReset[];

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}
