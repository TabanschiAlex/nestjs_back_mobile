import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from '../services/ProductService';
import { Product } from '../entities/Product';
import { AuthModule } from './AuthModule';
import { ProductController } from '../controllers/ProductController';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), AuthModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
