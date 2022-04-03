import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { AuthRestoreRequest } from '../../requests/auth/AuthRestoreRequest';

export class AuthRestoreDTO implements PipeTransform {
  transform(auth: AuthRestoreRequest, metadata: ArgumentMetadata): AuthRestoreRequest {
    return {
      token: auth.token,
      password: auth.password,
      passwordConfirmation: auth.passwordConfirmation,
    };
  }
}
