import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../entities/Cart';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Request } from 'express';
import { CartRequest } from '../requests/cart/CartRequest';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  public async getAll(): Promise<Cart[]> {
    return await this.cartRepository.find();
  }

  public async getOne(id: string) {
    try {
      return await this.cartRepository.findOneOrFail(id);
    } catch (e) {
      throw new NotFoundException();
    }
  }

  public async save(cartRequest: CartRequest, req: Request): Promise<any> {
    try {
      return await this.cartRepository.save(cartRequest);
    } catch (e) {
      throw new UnprocessableEntityException();
    }
  }

  public async update(id: string, productDTO: QueryDeepPartialEntity<Cart>): Promise<any> {
    try {
      return await this.cartRepository.update(id, productDTO);
    } catch (e) {
      throw new UnprocessableEntityException();
    }
  }

  public async delete(id: string): Promise<any> {
    try {
      await this.cartRepository.findOneOrFail(id);
      return await this.cartRepository.delete(id);
    } catch (e) {
      throw new UnprocessableEntityException();
    }
  }
}
