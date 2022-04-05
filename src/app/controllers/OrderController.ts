import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/JwtAuthGuard';
import { OrderService } from '../services/OrderService';
import { OrderRequest } from '../requests/order/OrderRequest';

@Controller('orders')
@UseGuards(JwtAuthGuard)
@UsePipes(ValidationPipe)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  public async getOrders() {
    return this.orderService.getAll();
  }

  @Post()
  public async store(@Body() body: OrderRequest, @Req() req) {
    return this.orderService.create(body.items, req);
  }
}
