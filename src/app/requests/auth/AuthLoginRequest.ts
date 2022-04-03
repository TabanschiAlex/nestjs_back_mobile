import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { BasicRequest } from '../BasicRequest';

export class AuthLoginRequest implements BasicRequest {
  @IsNotEmpty({ message: 'requests.is_not.empty' })
  @IsEmail({}, { message: 'Поле не является типом Email' })
  readonly email: string;

  @IsNotEmpty({ message: 'Пароль не может быть пустым' })
  @IsString({ message: 'Поле должно быть строкой' })
  readonly password: string;
}

