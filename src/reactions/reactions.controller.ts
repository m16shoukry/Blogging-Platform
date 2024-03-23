import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ReactionsService } from './reactions.service';
import { SwaggerApiDocumentation } from 'src/common/decorators/swagger-api-documentation.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorators';
import { SuccessApiResponse } from 'src/common/dto/api-response/success-api-response.dto';
import { PostDocument } from 'src/posts/entities/posts.schema';
import { UserDocument } from 'src/user/entities/user.schema';
import { GetPostDto } from 'src/posts/dto/get-post.dto';
import { BaseApiResponse } from 'src/common/dto/api-response/base-api-response.dto';
import { CreateReactionDto } from './dto/create-reaction.dto';

@Controller('reactions')
@ApiTags('reactions')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @Post('posts/:id')
  @SwaggerApiDocumentation({
    summary: 'add reaction to post',
    modelType: GetPostDto,
  })
  async addReactionToPost(
    @Param('id') postId: string,
    @GetUser() user: UserDocument,
    @Body() createReactionDto: CreateReactionDto,
  ): Promise<BaseApiResponse<PostDocument>> {
    const post = await this.reactionsService.addReactionToPost(
      postId,
      user,
      createReactionDto,
    );
    return new SuccessApiResponse<PostDocument>(post);
  }
}
