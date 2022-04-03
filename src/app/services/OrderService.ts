import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductRequest } from '../requests/product/ProductRequest';
import { Order } from '../entities/Order';
import { User } from '../entities/User';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async getAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  public async getOne(id: string) {
    return await this.orderRepository.findOneOrFail(id);
  }

  public async create(productDTO: ProductRequest, req): Promise<any> {
    const order = new Order();

    order.user = await this.userRepository.findOneOrFail(req.user.uuid);
    order.total_price = 0;

    return await this.orderRepository.save(order);
  }
}
