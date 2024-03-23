import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateCommentDTO {
  @IsString()
  @ApiProperty({ type: String, description: 'Post title' })
  title: string;

  @IsString()
  @ApiProperty({ type: String, description: 'Post content' })
  content: string;
}
