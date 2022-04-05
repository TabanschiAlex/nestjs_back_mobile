import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '../exceptions/AllExceptionsFilter';
import { AuthModule } from './AuthModule';
import { CartModule } from './CartModule';
import { FavouriteModule } from './FavouriteModule';
import { OrderModule } from './OrderModule';
import { ProductModule } from './ProductModule';
import { UserModule } from './UserModule';
import { ItemModule } from './ItemModule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    AuthModule,
    CartModule,
    FavouriteModule,
    OrderModule,
    ProductModule,
    UserModule,
    ItemModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
