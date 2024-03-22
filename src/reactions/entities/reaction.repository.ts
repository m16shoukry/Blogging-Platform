import { Injectable } from '@nestjs/common';
import { EntityRepository } from '../../database/entity.repository';
import { Reaction, ReactionDocument } from './reactions.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReactionRepository extends EntityRepository<ReactionDocument> {
  constructor(@InjectModel(Reaction.name) reactionModel: Model<ReactionDocument>) {
    super(reactionModel);
  }
}
