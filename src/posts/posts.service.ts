import { Injectable } from '@nestjs/common';
import { PostRepository } from './entities/posts.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { Post, PostDocument } from './entities/posts.schema';
import { User } from '../user/entities/user.schema';
import { PaginateDto } from '../common/dto/pagination/paginate-sort-dto';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostRepository) {}

  async create(
    editor: User,
    createPostDto: CreatePostDto,
  ): Promise<PostDocument> {
    const post = await this.postsRepository.create({
      ...createPostDto,
      author: editor,
    });
    return post;
  }

  async list(basePaginateDto: PaginateDto): Promise<any> {
    return await this.postsRepository.findAllPaginated(basePaginateDto);
  }

  async listUserPosts(
    editor: User,
    basePaginateDto: PaginateDto,
  ): Promise<any> {
    return await this.postsRepository.listUserPosts(editor, basePaginateDto);
  }

  async findOne(data: any): Promise<PostDocument> {
    return await this.postsRepository.findOne(data);
  }

  async update(
    id: string,
    postData: Partial<Post>,
  ): Promise<PostDocument> {
    return await this.postsRepository.findOneAndUpdate({ _id: id }, postData);
  }

  async remove(id: string): Promise<boolean> {
    return await this.postsRepository.deleteMany({ _id: id });
  }
}
