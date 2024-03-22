import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostRepository } from './entities/posts.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './entities/posts.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports:[MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),UserModule],
  controllers: [PostsController],
  providers: [PostsService,PostRepository],
  exports: [PostsService,PostRepository],
})
export class PostsModule {}
