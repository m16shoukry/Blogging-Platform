import { Injectable } from '@nestjs/common';
import { EntityRepository } from '../../database/entity.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './comments.schema';

@Injectable()
export class CommentsRepository extends EntityRepository<CommentDocument> {
  constructor(@InjectModel(Comment.name) commentModel: Model<CommentDocument>) {
    super(commentModel);
  }
}
