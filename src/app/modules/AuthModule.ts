import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from '../controllers/AuthController';
import { AuthService } from '../services/AuthService';
import { UserModule } from './UserModule';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from './MailModule';

@Module({
  imports: [
    forwardRef(() => UserModule),
    MailModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_KEY,
        signOptions: {
          expiresIn: '16d',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
