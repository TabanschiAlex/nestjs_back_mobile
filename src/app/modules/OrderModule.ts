import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/Order';
import { OrderController } from '../controllers/OrderController';
import { OrderService } from '../services/OrderService';
import { User } from '../entities/User';
import { Item } from '../entities/Item';
import { ItemModule } from './ItemModule';
import { AuthModule } from './AuthModule';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, User, Item]),
    forwardRef(() => ItemModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
