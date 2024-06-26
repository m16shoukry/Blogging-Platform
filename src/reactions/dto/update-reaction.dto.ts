import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Reaction_Types } from '../interfaces/reactions.interface';

export class UpdateReactionDTO {
  @IsString()
  @ApiProperty({ type: String, description: 'Reaction type' })
  type: Reaction_Types;

}
