import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { SwaggerApiDocumentation } from '../common/decorators/swagger-api-documentation.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { SuccessApiResponse } from '../common/dto/api-response/success-api-response.dto';
import { GetPostDto } from './dto/get-post.dto';
import { BaseApiResponse } from '../common/dto/api-response/base-api-response.dto';
import { PostDocument } from './entities/posts.schema';
import { GetUser } from '../auth/decorators/get-user.decorators';
import { UserDocument } from '../user/entities/user.schema';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorators';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { User_Role } from '../user/interfaces/user.interface';
import { PaginateResultDto } from '../common/dto/pagination/paginate-result-dto';
import { PaginateDto } from '../common/dto/pagination/paginate-sort-dto';
import { UpdatePostDTO } from './dto/update-post.dto';

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
    const newPost = await this.postsService.create(editor, createPostDto);
    return new SuccessApiResponse<PostDocument>(newPost);
  }

  @Get()
  @Roles(User_Role.EDITOR)
  @SwaggerApiDocumentation({
    summary: '[Editor] List all own posts',
    modelType: GetPostDto,
    isArray: true,
    isPagination: true,
  })
  async listUserPosts(
    @GetUser() editor: UserDocument,
    @Query() paginateSortDto: PaginateDto,
  ): Promise<any> {
    const posts: PaginateResultDto<PostDocument> =
      await this.postsService.listUserPosts(editor, paginateSortDto);
    return posts;
  }

  @Get('feed')
  @SwaggerApiDocumentation({
    summary: 'List all posts on feed',
    modelType: GetPostDto,
    isArray: true,
    isPagination: true,
  })
  async list(@Query() paginateSortDto: PaginateDto): Promise<any> {
    const posts: PaginateResultDto<PostDocument> = await this.postsService.list(
      paginateSortDto,
    );
    return posts;
  }

  @Get(':id')
  @SwaggerApiDocumentation({
    summary: 'Get One post',
    modelType: GetPostDto,
  })
  async findOne(
    @Param('id') id: string,
  ): Promise<BaseApiResponse<PostDocument>> {
    const user = await this.postsService.findOne({ _id: id });
    return new SuccessApiResponse<PostDocument>(user);
  }

  @Patch(':id')
  @Roles(User_Role.EDITOR)
  @SwaggerApiDocumentation({
    summary: '[Editor] Update post',
    modelType: GetPostDto,
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdatePostDTO) {
    const user = await this.postsService.update(id, updateUserDto);
    return new SuccessApiResponse<PostDocument>(user);
  }

  @Delete(':id')
  @Roles(User_Role.EDITOR)
  @SwaggerApiDocumentation({
    summary: '[Editor] Delete post',
    modelType: GetPostDto,
  })
  async remove(@Param('id') id: string) {
    return await this.postsService.remove(id);
  }
}
