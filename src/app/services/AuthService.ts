import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/User';
import { UserService } from './UserService';
import { AuthRegisterRequest } from '../requests/auth/AuthRegisterRequest';
import { AuthLoginRequest } from "../requests/auth/AuthLoginRequest";
import { AuthResource } from '../resources/auth/AuthResource';
import { AuthRestoreRequest } from '../requests/auth/AuthRestoreRequest';
import { AuthNotifications } from '../notifications/users/AuthNotifications';
import { I18nService } from "nestjs-i18n";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly authNotifications: AuthNotifications,
    private readonly i18n: I18nService
  ) {}

  /**
   * This method check if email and password match and generates a jwt token
   * @param request
   * @return Promise<AuthResource>
   */
  public async login(request: AuthLoginRequest): Promise<AuthResource> {
    return this.generateToken(await this.validateUser(request));
  }

  /**
   * This method checks if user with requested email not exist, check password identity,
   * create new user and notify him
   * @param request
   * @return Promise<string>
   */
  public async register(request: AuthRegisterRequest): Promise<string> {
    if (await this.userService.getUserByEmail(request.email)) {
      throw new UnprocessableEntityException(this.i18n.t('auth.exceptions.email_already_exists', { lang: 'ru' }));
    }

    this.checkPasswordsIdentity(request.password, request.passwordConfirmation);

    const hashedPassword = await AuthService.hashPassword(request.password);
    await this.userService.storeUser({
      ...request,
      password: hashedPassword,
    });

    this.authNotifications.registration(request.email);

    return this.i18n.t('auth.notifications.registration', { lang: 'ru' });
  }

  /**
   * This method create special token and send email notification for reset password
   * @param email
   * @return Promise<string>
   */
  public async forgotPassword(email: string): Promise<string> {
    const resetToken = await this.userService.createPasswordResetToken(email);
    this.authNotifications.forgot(email, resetToken);

    return this.i18n.t('auth.notifications.forgot', { lang: 'ru' });
  }

  /**
   * This method activates user account
   * @param uuid
   * @return Promise<void>
   */
  public async activateAccount(uuid: string): Promise<void> {
    await this.userService.updateUser(uuid, { confirmed: true })
  }

  /**
   * This method check if reset token is valid
   * @param token
   * @return Promise<void>
   */
  public async checkResetToken(token: string): Promise<void> {
    await this.userService.getLastPasswordResetToken(token);
  }

  /**
   * This method resets password
   * @param request
   */
  public async resetPassword(request: AuthRestoreRequest): Promise<void> {
    const passwordReset = await this.userService.getLastPasswordResetToken(request.token);
    const user = passwordReset.user;

    this.checkPasswordsIdentity(request.password, request.passwordConfirmation);

    user.password = await AuthService.hashPassword(request.password);
    await this.userService.updateUser(user.uuid, user);

    this.authNotifications.successfullyReset(user.email, user);
  }

  /**
   * This method check if the password and passwordConfirmation is identical in case is not throw Http Exception
   * @param password
   * @param passwordConfirmation
   * @throws UnprocessableEntityException
   */
  private checkPasswordsIdentity(password: string, passwordConfirmation: string): void {
    if (password !== passwordConfirmation) {
      throw new UnprocessableEntityException(this.i18n.t('auth.exceptions.password_not_match', { lang: 'ru' }));
    }
  }

  /**
   * This method crypt users password using library bcrypt
   * @param password
   */
  private static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  /**
   * This method generate user credentials: token and user entity
   * @param user
   */
  private async generateToken(user: User): Promise<AuthResource> {
    const payload = { uuid: user.uuid, email: user.email, roles: user.roles };
    return new AuthResource(user, this.jwtService.sign(payload));
  }

  /**
   * This method validate if user exists and if password is correct
   * @param authDto
   * @return Promise<User>
   */
  private async validateUser(authDto: AuthLoginRequest): Promise<User> {
    const user = await this.userService.getUserByEmail(authDto.email);

    if (!user && !(await bcrypt.compare(authDto.password, user.password))) {
      throw new UnauthorizedException(this.i18n.t('auth.exceptions.invalid_email_or_password'));
    }

    if (!user.confirmed) {
      throw new UnauthorizedException(this.i18n.t('auth.exceptions.inactive_user', { lang: 'ru' }));
    }

    if (user.banned) {
      throw new UnauthorizedException(this.i18n.t('auth.exceptions.banned', { lang: 'ru' }));
    }

    return user;
  }
}
