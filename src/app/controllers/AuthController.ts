import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../services/AuthService';
import { AuthResource } from '../resources/auth/AuthResource';
import { AuthRegisterRequest } from '../requests/auth/AuthRegisterRequest';
import { AuthLoginRequest } from '../requests/auth/AuthLoginRequest';
import { AuthRestoreRequest } from '../requests/auth/AuthRestoreRequest';
import { AuthLoginDTO } from '../dto/auth/AuthLoginDTO';
import { AuthRegisterDTO } from '../dto/auth/AuthRegisterDTO';
import { AuthRestoreDTO } from '../dto/auth/AuthRestoreDTO';

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Endpoint to authorize in application
   * @param request
   * @return Token with user data
   */
  @Post('login')
  public async login(@Body(AuthLoginDTO) request: AuthLoginRequest): Promise<AuthResource> {
    return await this.authService.login(request);
  }

  /**
   * Endpoint to create new account in application
   * @param request
   * @return message about email notification
   */
  @Post('register')
  public async register(@Body(AuthRegisterDTO) request: AuthRegisterRequest): Promise<string> {
    return await this.authService.register(request);
  }

  /**
   * Endpoint to create request for restore account password
   * @param request
   * @return message about email notification
   */
  @Post('forgot')
  public async forgotPassword(@Body() request: { email: string }): Promise<string> {
    return await this.authService.forgotPassword(request.email);
  }

  /**
   * Endpoint to check if password reset token is valid
   * @param token
   * @return status code 200 | 404
   */
  @Get('reset/:token')
  public async checkResetToken(@Param('token') token: string): Promise<void> {
    return await this.authService.checkResetToken(token);
  }

  /**
   * Endpoint to change password using reset password token
   * @param request
   * @return status code 200 | 404 | 422
   */
  @Post('reset')
  public async resetPassword(@Body(AuthRestoreDTO) request: AuthRestoreRequest): Promise<void> {
    return await this.authService.resetPassword(request);
  }

  /**
   * Endpoint to activate account after registration
   * @param uuid
   * @return status code 200
   */
  @Get('activate/:uuid')
  public async activateAccount(@Param('uuid') uuid: string): Promise<void> {
    return await this.authService.activateAccount(uuid);
  }
}
