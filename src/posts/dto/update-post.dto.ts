import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePostDTO {
  @IsString()
  @ApiProperty({ type: String, description: 'Post title' })
  title: string;

  @IsString()
  @ApiProperty({ type: String, description: 'Post content' })
  content: string;
}
