import { Module } from '@nestjs/common';
import { ReactionsController } from './reactions.controller';
import { ReactionsService } from './reactions.service';
import { ReactionRepository } from './entities/reaction.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Reaction, ReactionSchema } from './entities/reactions.schema';
import { UserModule } from '../user/user.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reaction.name, schema: ReactionSchema },
    ]),
    UserModule,
    PostsModule,
  ],
  controllers: [ReactionsController],
  providers: [ReactionsService, ReactionRepository],
  exports: [ReactionsService, ReactionRepository],
})
export class ReactionsModule {}
