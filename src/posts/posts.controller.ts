import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { SwaggerApiDocumentation } from 'src/common/decorators/swagger-api-documentation.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { SuccessApiResponse } from 'src/common/dto/api-response/success-api-response.dto';
import { GetPostDto } from './dto/get-post.dto';
import { BaseApiResponse } from 'src/common/dto/api-response/base-api-response.dto';
import { PostDocument } from './entities/posts.schema';
import { GetUser } from 'src/auth/decorators/get-user.decorators';
import { User, UserDocument } from 'src/user/entities/user.schema';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User_Role } from 'src/user/interfaces/user.interface';

@Controller('posts')
@ApiTags('posts')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @Roles(User_Role.EDITOR)
  @SwaggerApiDocumentation({
    summary: '[Editor] create post',
    modelType: GetPostDto,
  })
  async create(
    @GetUser() editor: UserDocument,
    @Body() createPostDto: CreatePostDto,
  ): Promise<BaseApiResponse<PostDocument>> {
    const newUser = await this.postsService.create(editor, createPostDto);
    return new SuccessApiResponse<PostDocument>(newUser);
  }
}
