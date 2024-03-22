import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../user/entities/user.schema';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ type: User })
  author: User;

  @Prop()
  content: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);