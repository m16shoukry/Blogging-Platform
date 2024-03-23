import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { GetUserDto } from '../../user/dto/get-user.dto';

export class GetCommentDto {
  @IsString()
  @ApiProperty({ type: String, description: 'comment id' })
  _id: string;

  @ApiProperty({ type: GetUserDto, description: 'comment author' })
  auther: GetUserDto;

  @IsString()
  @ApiProperty({ type: String, description: 'comment content' })
  content: string;
  
  @IsString()
  @ApiProperty({ type: Date, description: 'comment createdAt' })
  createdAt: Date;
}
