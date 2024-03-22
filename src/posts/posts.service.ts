import { Injectable } from '@nestjs/common';
import { PostRepository } from './entities/posts.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { PostDocument } from './entities/posts.schema';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostRepository) {}

  async create(editorId:string, createPostDto: CreatePostDto): Promise<PostDocument> {
    const user = await this.postsRepository.create({...createPostDto, author: editorId });
    return user;
  }
}
