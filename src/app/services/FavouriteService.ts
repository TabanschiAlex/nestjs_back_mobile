import { Injectable, UnprocessableEntityException } from '@nestjs/common';
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

  public async getAll(req): Promise<Product[]> {
    const favourites = await this.favouriteRepository.find({
      where: { user: req.user.uuid },
      loadEagerRelations: true,
      relations: ['product'],
    });

    return favourites.map((value) => value.product);
  }

  public async add(product_id: string, req): Promise<any> {
    if (await this.favouriteRepository.findOne({ where: { product: product_id, user: req.user.uuid } })) {
      throw new UnprocessableEntityException('Already in favourites!');
    }

    const favourite = new Favourite();

    favourite.user = await this.userRepository.findOneOrFail(req.user.uuid);
    favourite.product = await this.productRepository.findOneOrFail(product_id);

    await this.favouriteRepository.save(favourite);

    return true;
  }

  public async delete(product_id, req): Promise<any> {
    await this.favouriteRepository.findOneOrFail({ where: { product: product_id, user: req.user.uuid } });
    return await this.favouriteRepository.delete({ product: product_id });
  }
}
