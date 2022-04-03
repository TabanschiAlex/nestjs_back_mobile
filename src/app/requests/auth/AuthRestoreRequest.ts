import { IsNotEmpty, IsString } from 'class-validator';
import { BasicRequest } from '../BasicRequest';

export class AuthRestoreRequest implements BasicRequest {
  @IsNotEmpty()
  @IsString()
  readonly token: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly passwordConfirmation: string;
}
