import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthRegisterRequest {
  @IsNotEmpty({ message: 'Email не может быть пустым' })
  @IsEmail({}, { message: 'Поле не является типом Email' })
  readonly email: string;

  @IsNotEmpty({ message: 'Пароль не может быть пустым' })
  @IsString({ message: 'Поле должено быть строкой' })
  readonly password: string;

  @IsNotEmpty({ message: 'Пароль для проверки не может быть пустым' })
  @IsString({ message: 'Поле должено быть строкой' })
  readonly passwordConfirmation: string;
}
