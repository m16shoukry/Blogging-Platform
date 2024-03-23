import { Injectable } from '@nestjs/common';
import { PostsService } from '../posts/posts.service';
import { CommentsRepository } from './entities/comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UserDocument } from 'src/user/entities/user.schema';
import { PostDocument } from 'src/posts/entities/posts.schema';
import { Comment } from './entities/comments.schema';
import { PostRepository } from 'src/posts/entities/posts.repository';

@Injectable()
export class CommentsService {
  constructor(
    private readonly postsRepository: PostRepository,
    private readonly commentsRepository: CommentsRepository,
  ) {}

  async addCommentToPost(
    user: UserDocument,
    postId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<PostDocument> {
    const comment = await this.commentsRepository.create({
      ...createCommentDto,
      author: user,
    });

    const updatedPost = await this.postsRepository.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: comment } },
    );

    return updatedPost;
  }
}
