import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { FavouriteService } from '../services/FavouriteService';
import { JwtAuthGuard } from '../guards/JwtAuthGuard';
import { Request } from 'express';
import { FavouriteStoreDTO } from '../dto/favourite/FavouriteStoreDTO';
import { FavouriteRequest } from '../requests/favourite/FavouriteRequest';

@Controller('favourites')
@UseGuards(JwtAuthGuard)
@UsePipes(ValidationPipe)
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) {
  }

  @Get()
  public async getFavourites() {
    return this.favouriteService.getAll();
  }

  @Post()
  public async addFavourite(@Body(FavouriteStoreDTO) request: FavouriteRequest, @Req() req: Request) {
    return this.favouriteService.add(request);
  }

  @Delete()
  public async deleteFavourite(@Param('id') id: string) {
    return this.favouriteService.delete(id);
  }
}