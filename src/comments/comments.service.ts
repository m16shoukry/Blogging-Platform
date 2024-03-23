import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './entities/comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UserDocument } from 'src/user/entities/user.schema';
import { PostDocument } from 'src/posts/entities/posts.schema';
import { PostRepository } from 'src/posts/entities/posts.repository';
import { LiveCommentsGateway } from './live-comments/live-comments.gateway';

@Injectable()
export class CommentsService {
  constructor(
    private readonly postsRepository: PostRepository,
    private readonly commentsRepository: CommentsRepository,
    private readonly liveCommentsGateway: LiveCommentsGateway,
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

    // Emit the new comment to all connected clients
    this.liveCommentsGateway.broadcastComment(comment);

    return updatedPost;
  }
}
