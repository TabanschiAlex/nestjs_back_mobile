import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favourite } from '../entities/Favourite';
import { FavouriteController } from '../controllers/FavouriteController';
import { FavouriteService } from '../services/FavouriteService';
import { User } from '../entities/User';
import { Product } from '../entities/Product';
import { AuthModule } from './AuthModule';

@Module({
  imports: [TypeOrmModule.forFeature([Favourite, User, Product]), forwardRef(() => AuthModule)],
  controllers: [FavouriteController],
  providers: [FavouriteService],
})
export class FavouriteModule {}
