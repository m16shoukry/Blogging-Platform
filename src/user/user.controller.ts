import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateProfileDTO } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorators';
import { User_Role } from './interfaces/user.interface';
import { SwaggerApiDocumentation } from '../common/decorators/swagger-api-documentation.decorator';
import { BaseApiResponse } from '../common/dto/api-response/base-api-response.dto';
import { SuccessApiResponse } from '../common/dto/api-response/success-api-response.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { GetUserDto } from './dto/get-user.dto';
import { User } from './entities/user.schema';
import { PaginateDto } from '../common/dto/pagination/paginate-sort-dto';
import { PaginateResultDto } from '../common/dto/pagination/paginate-result-dto';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Roles(User_Role.ADMIN)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @SwaggerApiDocumentation({
    summary: 'List all users',
    modelType: GetUserDto,
    isArray: true,
    isPagination: true,
  })
  async list(@Query() paginateSortDto: PaginateDto): Promise<any> {
    const users: PaginateResultDto<User> = await this.userService.list(
      paginateSortDto,
    );
    return users;
  }

  @Get(':id')
  @SwaggerApiDocumentation({
    summary: 'Get One user by id',
    modelType: GetUserDto,
  })
  async findOne(@Param('id') id: string): Promise<BaseApiResponse<User>> {
    const user = await this.userService.findOne(id);
    return new SuccessApiResponse<User>(user);
  }

  @Patch(':id')
  @SwaggerApiDocumentation({
    summary: 'Update One user by id',
    modelType: GetUserDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateProfileDTO,
  ) {
    const user = await this.userService.update(id, updateUserDto);
    return new SuccessApiResponse<User>(user);
  }

  @Delete(':id')
  @SwaggerApiDocumentation({
    summary: 'Delete user by id',
    modelType: GetUserDto,
  })
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
