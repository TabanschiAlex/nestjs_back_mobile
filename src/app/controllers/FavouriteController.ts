import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FavouriteService } from '../services/FavouriteService';
import { JwtAuthGuard } from '../guards/JwtAuthGuard';

@Controller('favourites')
@UseGuards(JwtAuthGuard)
@UsePipes(ValidationPipe)
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) {}

  @Get()
  public async getFavourites() {
    return this.favouriteService.getAll();
  }

  @Post()
  public async addFavourite(@Body() body, @Req() req) {
    return this.favouriteService.add(body.product_id, req);
  }

  @Delete()
  public async deleteFavourite(@Param('id') id: string) {
    return this.favouriteService.delete(id);
  }
}
