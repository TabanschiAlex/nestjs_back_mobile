import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/User';
import { UserService } from './UserService';
import { AuthRegisterRequest } from '../requests/auth/AuthRegisterRequest';
import { AuthLoginRequest } from '../requests/auth/AuthLoginRequest';
import { AuthResource } from '../resources/auth/AuthResource';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(request: AuthLoginRequest): Promise<AuthResource> {
    return this.generateToken(await this.validateUser(request));
  }

  public async register(request: AuthRegisterRequest): Promise<AuthResource> {
    if (await this.userService.getUserByEmail(request.email)) {
      throw new UnprocessableEntityException('Already exists!');
    }

    AuthService.checkPasswordsIdentity(
      request.password,
      request.passwordConfirmation,
    );

    const hashedPassword = await AuthService.hashPassword(request.password);
    const user = await this.userService.storeUser({
      ...request,
      password: hashedPassword,
    });

    return this.generateToken(user);
  }

  public async forgotPassword(email: string): Promise<boolean> {
    const user = await this.userService.getUserByEmail(email);

    user.password = await AuthService.hashPassword('12345689');
    await this.userService.updateUser(user.uuid, user);

    return true;
  }

  private static checkPasswordsIdentity(
    password: string,
    passwordConfirmation: string,
  ): void {
    if (password !== passwordConfirmation) {
      throw new UnprocessableEntityException('Not Match!');
    }
  }

  private static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private async generateToken(user: User): Promise<AuthResource> {
    const payload = { uuid: user.uuid, email: user.email };
    return new AuthResource(user, this.jwtService.sign(payload));
  }

  private async validateUser(authDto: AuthLoginRequest): Promise<User> {
    const user = await this.userService.getUserByEmail(authDto.email);

    if (!user && !(await bcrypt.compare(authDto.password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }
}
