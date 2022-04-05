import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../entities/Item';
import { ItemService } from '../services/ItemService';
import { Product } from '../entities/Product';
import { Order } from '../entities/Order';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Product, Order])],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}
