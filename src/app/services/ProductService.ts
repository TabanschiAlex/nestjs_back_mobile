import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/Product';
import { ProductRequest } from '../requests/product/ProductRequest';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
  }

  public async getAll(req): Promise<Product[]> {
    const products = await this.productRepository.query(`select products.*, if(f.id is not null, true, false) as isFavourite\n` +
      `from products\n` +
      `    left join favourites f on products.id = f.product_id and user_uuid = '${req.user.uuid}';`);

    products.forEach((el) => el.images = JSON.parse(el.images));

    return products;
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
