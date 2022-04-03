import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from "nestjs-i18n";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly i18n: I18nService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException(this.i18n.t('auth.exceptions.incorrect_token', { lang: 'ru' }));
      }

      const user = this.jwtService.verify(token)
      req.user = user;

      if (!user.confirmed) {
        throw new UnauthorizedException(this.i18n.t('auth.exceptions.inactive_user', { lang: 'ru' }));
      }

      if (user.banned) {
        throw new UnauthorizedException(this.i18n.t('auth.exceptions.banned', { lang: 'ru' }));
      }

      return true;
  }
}
