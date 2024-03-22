import { ApiProperty } from '@nestjs/swagger';
import {  IsString } from 'class-validator';

export class GetPostDto {
  @IsString()
  @ApiProperty({ type: String, description: 'Post id' })
  _id: string;

  @IsString()
  @ApiProperty({ type: String, description: 'Post title' })
  title: string;

  @IsString()
  @ApiProperty({ type: String, description: 'Post content' })
  content: string;
  
  comments

  reactions
  
  @IsString()
  @ApiProperty({ type: Date, description: 'Post createdAt' })
  createdAt: Date;
}
