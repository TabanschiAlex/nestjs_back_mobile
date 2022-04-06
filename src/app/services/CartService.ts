import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../entities/Cart';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CartRequest } from '../requests/cart/CartRequest';
import { User } from '../entities/User';
import { Product } from '../entities/Product';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  public async getAll(req): Promise<Cart[]> {
    return await this.cartRepository.find({ where: { user: req.user.uuid } });
  }

  public async save(cartRequest: CartRequest, req): Promise<any> {
    const inCart = await this.cartRepository.findOne({
      where: { user: req.user.uuid, product: cartRequest.product_id },
      relations: ['product'],
    });

    if (inCart) {
      inCart.quantity += 1;
      inCart.total_price = inCart.quantity * inCart.product.price;
      await this.cartRepository.save(inCart);

      return 'updated';
    }

    const cart = new Cart();

    cart.user = await this.userRepository.findOneOrFail(req.user.uuid);
    cart.quantity = cartRequest?.quantity ?? 1;
    cart.product = await this.productRepository.findOneOrFail(cartRequest.product_id);
    cart.total_price = cart.quantity * cart.product.price;
    await this.cartRepository.save(cart);

    return 'added';
  }

  public async update(id: string, productDTO: QueryDeepPartialEntity<Cart>): Promise<any> {
    try {
      return await this.cartRepository.update(id, productDTO);
    } catch (e) {
      throw new UnprocessableEntityException();
    }
  }

  public async delete(id: string): Promise<any> {
    await this.cartRepository.findOneOrFail(id);
    return await this.cartRepository.delete(id);
  }
}
