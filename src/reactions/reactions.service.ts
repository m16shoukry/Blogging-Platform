import { Injectable } from '@nestjs/common';
import { PostRepository } from '../posts/entities/posts.repository';
import { ReactionRepository } from './entities/reaction.repository';
import { UserDocument } from '../user/entities/user.schema';
import { PostDocument } from '../posts/entities/posts.schema';
import { CreateReactionDto } from './dto/create-reaction.dto';

@Injectable()
export class ReactionsService {
  constructor(
    private readonly postsRepository: PostRepository,
    private readonly reactionRepository: ReactionRepository,
  ) {}

  async addReactionToPost(
    postId: string,
    user: UserDocument,
    createReactionDto: CreateReactionDto,
  ): Promise<PostDocument> {
    const reaction = await this.reactionRepository.create({
      ...createReactionDto,
      author: user,
    });

    const updatedPost = await this.postsRepository.findOneAndUpdate(
      { _id: postId },
      { $push: { reactions: reaction } },
    );

    return updatedPost;
  }
}
