import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favourite } from '../entities/Favourite';
import { FavouriteController } from '../controllers/FavouriteController';
import { FavouriteService } from '../services/FavouriteService';

@Module({
  imports: [TypeOrmModule.forFeature([Favourite])],
  controllers: [FavouriteController],
  providers: [FavouriteService],
})
export class FavouriteModule {}
