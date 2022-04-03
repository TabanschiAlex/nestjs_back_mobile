import { IsNotEmpty, IsString } from 'class-validator';
import { BasicRequest } from '../BasicRequest';

export class AuthRestoreRequest implements BasicRequest {
  @IsNotEmpty({ message: 'token не может быть пустым' })
  @IsString({ message: 'Поле не является строкой' })
  readonly token: string;

  @IsNotEmpty({ message: 'Пароль не может быть пустым' })
  @IsString({ message: 'Поле не является строкой' })
  readonly password: string;

  @IsNotEmpty({ message: 'Пароль для проверки не может быть пустым' })
  @IsString({ message: 'Поле не является строкой' })
  readonly passwordConfirmation: string;
}
