import { Injectable } from '@nestjs/common';
import { EntityRepository } from '../../database/entity.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './posts.schema';
import { User } from '../../user/entities/user.schema';
import { PaginateDto } from '../../common/dto/pagination/paginate-sort-dto';

@Injectable()
export class PostRepository extends EntityRepository<PostDocument> {
  constructor(@InjectModel(Post.name) postModel: Model<PostDocument>) {
    super(postModel);
  }

  async listUserPosts(editor: User, basePaginateDto: PaginateDto) {
    const { pageNumber, pageSize } = basePaginateDto;

    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;

    const data = await this.entityModel.find({author: editor}).skip(skip).limit(take).exec();

    const count = await this.entityModel.countDocuments({}).exec();

    const totalPages = Math.ceil(count / pageSize);

    return {
      data,
      count,
      pageNumber,
      pageSize,
      totalPages,
    };
  }
}
