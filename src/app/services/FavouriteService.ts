import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favourite } from '../entities/Favourite';
import { User } from '../entities/User';
import { Product } from '../entities/Product';

@Injectable()
export class FavouriteService {
  constructor(
    @InjectRepository(Favourite)
    private readonly favouriteRepository: Repository<Favourite>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  public async getAll(): Promise<Favourite[]> {
    return await this.favouriteRepository.find();
  }

  public async add(product_id: string, req): Promise<any> {
    const favourite = new Favourite();

    favourite.user = await this.userRepository.findOneOrFail(req.user.uuid);
    favourite.product = await this.productRepository.findOneOrFail(product_id);

    return await this.favouriteRepository.save(favourite);
  }

  public async delete(id: string): Promise<any> {
    await this.favouriteRepository.findOneOrFail(id);
    return await this.favouriteRepository.delete(id);
  }
}
