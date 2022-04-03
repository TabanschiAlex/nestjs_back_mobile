import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BasicController } from '../basic/BasicController';
import { Response } from 'express';
import { BasicQueryRequest } from '../../requests/BasicQueryRequest';
import { JwtAuthGuard } from '../../guards/JwtAuthGuard';
import { ProductService } from '../../services/ProductService';
import { ProductRequest } from '../../requests/product/ProductRequest';

@Controller('products')
@UsePipes(ValidationPipe)
export class ProductController implements BasicController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  public async index(@Query() query: BasicQueryRequest, @Res() res: Response) {
    try {
      return res.send(await this.productService.getAll(query)).status(HttpStatus.OK);
    } catch (e) {
      res.send(e.getResponse()).status(e.getStatus());
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  public async edit(@Param('id') id: string, @Res() res: Response) {
    try {
      return res.send(await this.productService.getOne(id)).status(HttpStatus.OK);
    } catch (e) {
      res.send(e.getResponse()).status(e.getStatus());
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  public async store(@Body() productRequest: ProductRequest, @Res() res: Response) {
    try {
      await this.productService.save(productRequest);

      return res.send('New manufacturer added successfully').status(HttpStatus.CREATED);
    } catch (e) {
      res.send(e.getResponse()).status(e.getStatus());
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  public async update(@Param('id') id: string, @Body() productRequest: ProductRequest, @Res() res: Response) {
    try {
      await this.productService.update(id, productRequest);

      return res.send('Manufacturer updated successfully').status(HttpStatus.NO_CONTENT);
    } catch (e) {
      res.send(e.getResponse()).status(e.getStatus());
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  public async destroy(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.productService.delete(id);

      return res.send('Manufacturer deleted successfully').status(HttpStatus.NO_CONTENT);
    } catch (e) {
      res.send(e.getResponse()).status(e.getStatus());
    }
  }
}
