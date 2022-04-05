import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/Product';
import { ProductRequest } from '../requests/product/ProductRequest';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  public async getAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  public async getOne(id: string) {
    try {
      return await this.productRepository.findOneOrFail(id);
    } catch (e) {
      throw new NotFoundException();
    }
  }

  public async save(productDTO: ProductRequest): Promise<any> {
    try {
      return await this.productRepository.save(productDTO);
    } catch (e) {
      throw new UnprocessableEntityException();
    }
  }

  public async update(id: string, productDTO: ProductRequest): Promise<any> {
    try {
      return await this.productRepository.update(id, productDTO);
    } catch (e) {
      throw new UnprocessableEntityException();
    }
  }

  public async delete(id: string): Promise<any> {
    try {
      await this.productRepository.findOneOrFail(id);
      return await this.productRepository.delete(id);
    } catch (e) {
      throw new UnprocessableEntityException();
    }
  }
}
