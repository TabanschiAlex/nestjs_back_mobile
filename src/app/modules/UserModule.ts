import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';
import { User } from '../entities/User';
import { AuthModule } from './AuthModule';
import { ProfileController } from '../controllers/user/ProfileController';
import { Address } from '../entities/Address';
import { Favourite } from '../entities/Favourite';
import { PasswordReset } from '../entities/PasswordReset';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address, Favourite, PasswordReset]), forwardRef(() => AuthModule)],
  controllers: [UserController, ProfileController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
