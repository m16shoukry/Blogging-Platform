import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignupUserDto } from './dto/signupUser.dto';
import { comparePassword, hashPassword } from './utils/passwords';
import { AuthenticatedUserDto } from './dto/authenticatedUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserService } from '../user/user.service';
import { ErrorApiResponse } from '../common/dto/api-response/Error-api-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private userService: UserService,
  ) {}

  async signToken(userId: string, email: string, role: string) {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: `${this.config.get('JWT_EXPIRATION_IN_HOURS')}h`,
      secret,
    });

    return { access_token: token, role };
  }

  async signup(signupUserDto: SignupUserDto): Promise<AuthenticatedUserDto> {
    const user = await this.userService.findOne({email:signupUserDto.email});

    if (user) {
      throw new ErrorApiResponse();
    }
    const hashedPassword = hashPassword(signupUserDto.password);
    const newUser = await this.userService.create({
      ...signupUserDto,
      password: hashedPassword,
    });

    return await this.signToken(newUser._id, newUser.email, newUser.role);
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userService.findOne({email: loginUserDto.email});
    if (!user) throw new NotFoundException();

    const pwMatches = comparePassword(loginUserDto.password, user.password);

    if (!pwMatches) throw new ForbiddenException();

    return this.signToken(user._id, user.email, user.role);
  }
}
