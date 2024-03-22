import { Response } from 'express';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerApiDocumentation } from '../common/decorators/swagger-api-documentation.decorator';
import { SuccessApiResponse } from '../common/dto/api-response/success-api-response.dto';
import { AuthService } from './auth.service';
import { SignupUserDto } from './dto/signupUser.dto';
import { AuthenticatedUserDto } from './dto/authenticatedUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @SwaggerApiDocumentation({
    summary: 'Signup for users or editors',
    modelType: AuthenticatedUserDto,
  })
  async signup(
    @Body() signupUserDto: SignupUserDto,
  ) {
    const newUser = await this.authService.signup(signupUserDto);
    return new SuccessApiResponse<AuthenticatedUserDto>(newUser);
  }

  @Post('login')
  @SwaggerApiDocumentation({
    summary: 'Login users or visitors',
    modelType: AuthenticatedUserDto,
  })
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
  ) {
    const newUser = await this.authService.loginUser(loginUserDto);
    return new SuccessApiResponse<AuthenticatedUserDto>(newUser);
  }
}
