import { Module } from '@nestjs/common';
import { ReactionsController } from './reactions.controller';
import { ReactionsService } from './reactions.service';
import { ReactionRepository } from './entities/reaction.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Reaction, ReactionSchema } from './entities/reactions.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reaction.name, schema: ReactionSchema },
    ]),
  ],
  controllers: [ReactionsController],
  providers: [ReactionsService, ReactionRepository],
  exports: [ReactionsService, ReactionRepository],
})
export class ReactionsModule {}
