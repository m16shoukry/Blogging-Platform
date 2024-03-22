import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../user/entities/user.schema';
import { Reaction_Types } from '../interfaces/reactions.interface';

export type ReactionDocument = Reaction & Document;

@Schema()
export class Reaction {
  @Prop({ type: User })
  user: User;

  @Prop({ enum: Reaction_Types })
  type: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ReactionSchema = SchemaFactory.createForClass(Reaction);
