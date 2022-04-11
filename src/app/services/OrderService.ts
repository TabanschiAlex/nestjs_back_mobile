import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/Order';
import { User } from '../entities/User';
import { ItemService } from './ItemService';
import { Cart } from '../entities/Cart';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly itemService: ItemService,
  ) {}

  public async getAll(req): Promise<Order[]> {
    return await this.orderRepository.find({ where: { user: req.user.uuid } });
  }

  public async getOne(id: string) {
    return await this.orderRepository.findOneOrFail(id);
  }

  public async create(items: number[], req): Promise<any> {
    const order = new Order();

    order.user = await this.userRepository.findOneOrFail(req.user.uuid);
    order.total_price = 0;
    const saved = await this.orderRepository.save(order);
    const createdItems = await this.itemService.storeItems(items, saved.id);
    saved.total_price = createdItems.reduce((acc, value) => acc + value);

    await this.orderRepository.save(saved);

    await this.cartRepository.delete({ user: req.user.uuid });

    return true;
  }
}
