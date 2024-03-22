import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsRepository } from './entities/comments.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './entities/comments.schema';

@Module({
  imports:[ MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),],
  controllers: [CommentsController],
  providers: [CommentsService,CommentsRepository],
  exports: [CommentsService,CommentsRepository],

})
export class CommentsModule {}
