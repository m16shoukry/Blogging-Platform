import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { GetCommentDto } from '../../comments/dto/get-comment.dto';
import { GetUserDto } from '../../user/dto/get-user.dto';

export class GetPostDto {
  @IsString()
  @ApiProperty({ type: String, description: 'Post id' })
  _id: string;

  @ApiProperty({ type: GetUserDto, description: 'Post author' })
  auther: GetUserDto;

  @IsString()
  @ApiProperty({ type: String, description: 'Post title' })
  title: string;

  @IsString()
  @ApiProperty({ type: String, description: 'Post content' })
  content: string;

  @IsArray()
  @ApiProperty({ type: GetCommentDto, description: 'Post comments' })
  comments: GetCommentDto[];

  @IsArray()
  @ApiProperty({ type: Array, description: 'Post reactions' })
  reactions: [];

  @IsString()
  @ApiProperty({ type: Date, description: 'Post createdAt' })
  createdAt: Date;
}
