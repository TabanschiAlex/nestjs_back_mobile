import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from '../controllers/product/ProductController';
import { ProductService } from '../services/ProductService';
import { Product } from '../entities/Product';
import { AuthModule } from './AuthModule';
import { ProductCompatible } from '../entities/ProductCompatible';
import { ProductLabel } from '../entities/ProductLabel';
import { ProductSpecification } from '../entities/ProductSpecification';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductCompatible, ProductLabel, ProductSpecification]), AuthModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
