import { Injectable } from '@nestjs/common';
import { EntityRepository } from '../../database/entity.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './posts.schema';

@Injectable()
export class PostRepository extends EntityRepository<PostDocument> {
  constructor(@InjectModel(Post.name) postModel: Model<PostDocument>) {
    super(postModel);
  }
}
