import { Body, Controller, Get, Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/JwtAuthGuard';
import { Response } from 'express';
import { BasicRequest } from '../requests/BasicRequest';
import { OrderService } from '../services/OrderService';

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
  public async store(@Body() request: BasicRequest, @Res() res: Response) {
    return this.orderService.create(request);
  }
}
