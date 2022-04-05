import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { BasicRequest } from '../BasicRequest';

export class AuthLoginRequest implements BasicRequest {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
