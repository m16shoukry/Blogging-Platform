import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProfileDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'User name', required: true })
  name: string;

}
