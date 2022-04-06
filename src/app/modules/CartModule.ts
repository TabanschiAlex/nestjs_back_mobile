import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../entities/Cart';
import { CartController } from '../controllers/CartController';
import { CartService } from '../services/CartService';
import { AuthModule } from './AuthModule';
import { User } from '../entities/User';
import { Product } from '../entities/Product';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, User, Product]), forwardRef(() => AuthModule)],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
