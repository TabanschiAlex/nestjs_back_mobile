import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../entities/Item';
import { Product } from '../entities/Product';
import { Order } from '../entities/Order';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  public async storeItems(items: any[], orderId): Promise<void> {
    for (const item of items) {
      const newItem = new Item();

      newItem.product = await this.productRepository.findOneOrFail(item.product_id);
      newItem.quantity = item.quantity;
      newItem.order = await this.orderRepository.findOneOrFail(orderId);
      newItem.total_price = newItem.product.price * newItem.quantity;

      await this.itemRepository.save(newItem);
    }
  }
}
