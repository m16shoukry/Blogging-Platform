import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../user/entities/user.schema';
import { Reaction } from '../../reactions/entities/reactions.schema';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User | mongoose.Schema.Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ default: [] })
  comments: Comment[];

  @Prop({ default: [] })
  reactions: Reaction[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);