import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CartService } from '../services/CartService';
import { JwtAuthGuard } from '../guards/JwtAuthGuard';
import { CartRequest } from '../requests/cart/CartRequest';
import { Request } from 'express';

@Controller('cart')
@UseGuards(JwtAuthGuard)
@UsePipes(ValidationPipe)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  public async getItems() {
    return this.cartService.getAll();
  }

  @Post()
  public async addItem(@Body() request: CartRequest, @Req() req: Request) {
    return this.cartService.save(request, req);
  }

  @Patch()
  public async updateQuantity(
    @Param('id') id: string,
    @Body() quantity: number,
  ) {
    return this.cartService.update(id, { quantity: quantity });
  }

  @Delete()
  public async deleteItem(@Param('id') id: string) {
    return this.cartService.delete(id);
  }
}
