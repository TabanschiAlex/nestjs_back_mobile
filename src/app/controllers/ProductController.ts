import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BasicController } from './basic/BasicController';
import { JwtAuthGuard } from '../guards/JwtAuthGuard';
import { ProductService } from '../services/ProductService';
import { ProductRequest } from '../requests/product/ProductRequest';

@Controller('products')
@UsePipes(ValidationPipe)
export class ProductController implements BasicController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  public async index() {
    return await this.productService.getAll();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  public async edit(@Param('id') id: string) {
    return await this.productService.getOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  public async store(@Body() productRequest: ProductRequest) {
    return await this.productService.save(productRequest);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  public async update(@Param('id') id: string, @Body() productRequest: ProductRequest) {
    return await this.productService.update(id, productRequest);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  public async destroy(@Param('id') id: string) {
    return await this.productService.delete(id);
  }
}
