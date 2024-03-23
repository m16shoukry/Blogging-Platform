import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { GetUserDto } from '../../user/dto/get-user.dto';
import { Reaction_Types } from '../interfaces/reactions.interface';

export class GetReactionDto {
  @IsString()
  @ApiProperty({ type: String, description: 'Reaction id' })
  _id: string;

  @ApiProperty({ type: GetUserDto, description: 'Reaction author' })
  auther: GetUserDto;

  @IsString()
  @ApiProperty({ type: String, description: 'Reaction content' })
  type: Reaction_Types;

  @IsString()
  @ApiProperty({ type: Date, description: 'Reaction createdAt' })
  createdAt: Date;
}
