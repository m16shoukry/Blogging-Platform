import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CommentsService } from './comments.service';
import { SwaggerApiDocumentation } from '../common/decorators/swagger-api-documentation.decorator';
import { GetUser } from '../auth/decorators/get-user.decorators';
import { BaseApiResponse } from '../common/dto/api-response/base-api-response.dto';
import { PostDocument } from '../posts/entities/posts.schema';
import { GetPostDto } from '../posts/dto/get-post.dto';
import { UserDocument } from '../user/entities/user.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { SuccessApiResponse } from '../common/dto/api-response/success-api-response.dto';

@Controller('comments')
@ApiTags('comments')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('posts/:id')
  @SwaggerApiDocumentation({
    summary: 'create comment',
    modelType: GetPostDto,
  })
  async addCommentToPost(
    @Param('id') postId: string,
    @GetUser() user: UserDocument,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<BaseApiResponse<PostDocument>> {
    const post = await this.commentsService.addCommentToPost(user, postId, createCommentDto);
    return new SuccessApiResponse<PostDocument>(post);
  }
}
