import { Body, Controller, Delete, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { FavouriteService } from '../services/FavouriteService';
import { JwtAuthGuard } from '../guards/JwtAuthGuard';

@Controller('favourites')
@UseGuards(JwtAuthGuard)
@UsePipes(ValidationPipe)
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) {}

  @Get()
  public async getFavourites(@Req() req) {
    return await this.favouriteService.getAll(req);
  }

  @Post()
  public async addFavourite(@Body() body, @Req() req) {
    return this.favouriteService.add(body.product_id, req);
  }

  @Delete()
  public async deleteFavourite(@Body('id') id: string) {
    return this.favouriteService.delete(id);
  }
}
